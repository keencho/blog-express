import postSchema from '../models/post.schema';
import {getCurrentDate} from "../utils/time.util";

export default {
    // CREATE
    create: async () => {

        const post = new postSchema({
            created: getCurrentDate(),
            tag: "Spring",
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

    // LIST ALL
    listAll: async () => {

        // const postModel = mongoose.model('post', postSchema);
        return await postSchema.find();
    }
}
