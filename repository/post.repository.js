import postSchema from '../models/post.schema';

export default {
    // CREATE
    create: async () => {

        const post = new postSchema({
            created: new Date(),
            tag: "Spring",
            path: "spring",
            show: true,
            title: "test",
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
