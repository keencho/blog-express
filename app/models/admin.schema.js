import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema (
    {
        id: { type: String, required: true },
        pw: { type: String, required: true}
    },
    { collection: 'admin' }
)

export default mongoose.model('admin', adminSchema);
