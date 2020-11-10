import postSchema from '../models/post.schema';
import TimeUtils from "../utils/time.utils";
import StringUtils from "../utils/string.utils";

export default {
    // CREATE
    create: async () => {

        for (let i = 0; i <= 50; i++) {
            const post = new postSchema({
                created: TimeUtils.getUTCDate(new Date()),
                tag: ["DB"],
                thumbnail: i % 2 === 0 ? "https://pfh.goodsflow.com/resources/image/2020-10-30/5755f651-79cb-4746-9f56-c564325665da.jpg" : null,
                path: "spring",
                show: true,
                title: "2020-11-10: " + i + "번째",
                summary: "test test 중입니다.",
                contents: "test contents",
                regexContents: "test regex Contents",
                comments: null
            });

            await post.save();
        }
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

    // LIST FOR INFINITE SCROLL
    listInfiniteScroll: async (data) => {
        const start = Number(data.start);
        const limit = Number(data.limit);
        const tag = data.tag;
        const startDate = new Date(data.date);
        const endDate = TimeUtils.getUTCDate(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 59));

        const tagMatch = StringUtils.hasText(tag) ? { tag : tag } : { tag : { $ne: null } } ;
        const dateMatch = isNaN(startDate.getTime()) ? { created: { $ne : null} } : { created: { $gte: startDate, $lte: endDate }};

        const result = await postSchema.aggregate()
            .match(tagMatch)
            .match(dateMatch)
            .sort("-created")
            .skip(start)
            .limit(limit);

        const count = await postSchema
            .countDocuments(tagMatch)
            .countDocuments(dateMatch)
            .exec();

        return {
            count: count,
            rows: result
        }
    },

    // LIST ALL
    listAll: () => {
        return postSchema.find();
    }
}
