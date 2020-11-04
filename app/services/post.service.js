import postSchema from '../models/post.schema';
import {getCurrentDate} from "../utils/time.util";

export default {
    // CREATE
    create: async () => {

        const post = new postSchema({
            created: getCurrentDate(),
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
    list: async () => {
        const result = await postSchema.aggregate()
            .facet({
                paging: [
                    { $count: 'count' }
                ],
                rows: [{ $skip: 0 }, { $limit : 1 }]
            })

        return result;
    },

    // LIST ALL
    listAll: () => {
        return postSchema.find();
    }
}
