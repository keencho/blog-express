import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    created: {type: Date, required: true},
    writer: {type: String, required: true},
    contents: {type: String, required: true},
    password: {type: String, required: true, trim: true}
})

const postSchema = new mongoose.Schema({
    created: { type: Date, required: true },
    tag: { type: String, required: true},
    path: { type: String, required: true },
    show: { type: Boolean, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    contents: { type: String, required: true },
    regexContents: { type: String, required: true },
    comments: [commentSchema]
});

export default mongoose.model('post', postSchema);
