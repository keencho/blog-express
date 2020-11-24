import postSchema from '../models/post.schema';
import TimeUtils from "../utils/time.utils";
import JsonUtils from "../utils/json.utils";
import StringUtils from "../utils/string.utils";

export default {
    // VALIDATE
    validate: async (post) => {

        let success = true;
        let error;

        switch (true) {
            case !StringUtils.hasText(post.title):
                error = "제목";
                break;
            case post.tags.length < 1:
                error = "태그";
                break;
            case !StringUtils.hasText(post.path):
                error = "접근 경로";
                break;
            case !StringUtils.hasText(post.summary):
                error = "요약";
                break;
            case !StringUtils.hasText(post.contents):
                error = "컨텐츠";
                break;
        }

        if (StringUtils.hasText(error)) {
            success = false;
            error += "을(를) 입력하세요.";
        }

        const validate = {
            success: success,
            error: error
        }

        return validate;
    },

    // GET
    get: async(path) => {
        const post = await postSchema.findOne()
            .where('path').equals(path);

        return post;
    },

    // CREATE
    create: async(params) => {

        const existPost = await postSchema.findOne()
            .where('path').equals(params.path);

        if (existPost !== null) {
            throw new Error("이미 존재하는 경로입니다. 다른 경로를 입력해주세요.");
        }

        if (!Array.isArray(params.tags)) {
            params.tags = params.tags.split(" ");
        }

        const post = new postSchema({
            created: TimeUtils.getUTCDate(new Date()),
            tags: params.tags,
            thumbnail: StringUtils.hasText(params.thumbnail) ? params.thumbnail : null,
            path: params.path.replace(/\s/g, '-'),
            show: params.show === 'true',
            title: params.title,
            summary: params.summary,
            contents: params.contents
        });

        await post.save();
    },

    // UPDATE
    update: async(params) => {
        await postSchema.updateOne(
            { _id: params._id },
            {
                tags: params.tags,
                thumbnail: StringUtils.hasText(params.thumbnail) ? params.thumbnail : null,
                path: params.path.replace(/\s/g, '-'),
                show: params.show === 'true',
                title: params.title,
                summary: params.summary,
                contents: params.contents
            }
        )
    },

    delete: async(params) => {
      await postSchema.deleteOne(
          { _id: params._id }
      )
    },

    // LIST BY QUERY
    list: async (data) => {

        const start = Number(data.start);
        const limit = Number(data.limit);
        const tags = data.tags;
        const startDate = new Date(data.date);
        const endDate = TimeUtils.getUTCDate(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 59));

        const tagMatch = !StringUtils.hasText(tags) ? { tags : { $ne: null } } : { tags : tags } ;
        const dateMatch = isNaN(startDate.getTime()) ? { created: { $ne : null } } : { created: { $gte: startDate, $lte: endDate }};

        const list = await postSchema.aggregate()
            .match(dateMatch)
            .match(tagMatch)
            .facet({
                paging: [
                    { $count: 'count' },
                    { $addFields: {
                            start: start,
                            limit: limit,
                        }
                    }
                ],
                // 정렬은 무조건 최신순
                rows: [{$sort: {"created": -1}}, { $skip: start }, { $limit : limit }]
            })

        // TODO: what to do when facet paging result is zero. I calculate after querying, but I think it is bad idea
        if(list[0].paging.length === 0) {
            list[0].paging = {
                start: start,
                limit: limit,
                total: 0
            }
        }

        return list;
    },

    // LIST FOR INFINITE SCROLL
    listInfiniteScroll: async (data) => {
        const start = Number(data.start);
        const limit = Number(data.limit);
        const tags = data.tags;
        const startDate = new Date(data.date);
        const endDate = TimeUtils.getUTCDate(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 59));

        const tagMatch = StringUtils.hasText(tags) ? {tags: tags} : {tags: {$ne: null}};
        const dateMatch = isNaN(startDate.getTime()) ? {created: {$ne: null}} : {
            created: {
                $gte: startDate,
                $lte: endDate
            }
        };
        const showMatch = {show: true};

        const count = await postSchema
            .countDocuments(tagMatch)
            .countDocuments(dateMatch)
            .countDocuments(showMatch)
            .exec();

        const result = await postSchema.aggregate()
            .match(tagMatch)
            .match(dateMatch)
            .match(showMatch)
            .sort("-created")
            .skip(start)
            .limit(limit);

        return JsonUtils.pagingData(count, result)
    },

    // LIST ALL
    listAll: () => {
        return postSchema.find();
    }
}
