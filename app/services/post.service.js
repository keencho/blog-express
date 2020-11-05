import postSchema from '../models/post.schema';
import {getUTCDate} from "../utils/time.util";
import {isEmpty} from "../utils/string.util";

export default {
    // CREATE
    create: async () => {

        const post = new postSchema({
            created: getUTCDate(new Date()),
            tag: ["Swift", "iOS"],
            thumbnail: null,
            path: "spring",
            show: true,
            title: "test",
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
        const endDate = getUTCDate(new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 59));

        const tagMatch = isEmpty(tag) ? { tag : { $ne: null } } : { tag : tag } ;
        const dateMatch = isNaN(startDate.getTime()) ? { created: { $ne : null} } : { created: { $gte: startDate, $lte: endDate }};

        const result = await postSchema.aggregate()
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
                rows: [{ $skip: start }, { $limit : limit }]
            })

        return result;
    },

    // LIST ALL
    listAll: () => {
        return postSchema.find();
    }
}
