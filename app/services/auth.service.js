import adminSchema from '../models/admin.schema';

export default {
    issueJWTToken: async(data) => {
        const admin = await adminSchema.find()
            .where("id").equals(data.id);

        return admin;
    }
}
