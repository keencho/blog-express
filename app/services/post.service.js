import postSchema from '../models/post.schema';
import TimeUtils from "../utils/time.utils";
import StringUtils from "../utils/string.utils";

export default {
    // CREATE
    create: async () => {

        const post = new postSchema({
            created: TimeUtils.getUTCDate(new Date()),
            tag: ["DB"],
            thumbnail: null,
            path: "spring",
            show: true,
            title: "오늘의23",
            summary: "test test 중입니다.",
            contents: "test contents",
            regexContents: "test regex Contents",
            comments: null
        });

        await post.save();
    },

    // LIST BY QUERY
    list: async (data) => {

        const start = Number(data.start);
        const limit = Number(data.limit);
        const tag = data.tag;
        const startDate = new Date(data.date);
        const endDate = TimeUtils.getUTCDate(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 59));

        const tagMatch = !StringUtils.hasText(tag) ? { tag : { $ne: null } } : { tag : tag } ;
        const dateMatch = isNaN(startDate.getTime()) ? { created: { $ne : null} } : { created: { $gte: startDate, $lte: endDate }};

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

    // LIST FOR INIFINITE SCROLL
    listInfiniteScroll: async (data) => {
        const start = Number(data.start);
        const limit = Number(data.limit);
        const tag = data.tag;
        const startDate = new Date(data.date);
        const endDate = TimeUtils.getUTCDate(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 59));

        const tagMatch = StringUtils.hasText(tag) ? { tag : tag } : { tag : { $ne: null } } ;
        const dateMatch = isNaN(startDate.getTime()) ? { created: { $ne : null} } : { created: { $gte: startDate, $lte: endDate }};

        return await postSchema.aggregate()
            .match(tagMatch)
            .match(dateMatch)
            .sort("-created")
            .skip(start)
            .limit(limit);
    },

    // LIST ALL
    listAll: () => {
        return postSchema.find();
    }
}
