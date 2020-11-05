import postSchema from '../models/post.schema';
import {getUTCDate} from "../utils/time.util";

export default {
    // CREATE
    create: async () => {

        const post = new postSchema({
            created: getUTCDate(new Date()),
            tag: "Annotation",
            thumbnail: "https://pfh.goodsflow.com/resources/image/2020-10-30/5755f651-79cb-4746-9f56-c564325665da.jpg",
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

        const tagMatch = tag.length > 0 ? { tag : tag } : { tag : { $ne: null } };
        const dateMatch = isNaN(startDate.getTime()) ? { created: { $ne : null} } : { created: { $gte: startDate, $lte: endDate }};

        console.log(dateMatch);

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
