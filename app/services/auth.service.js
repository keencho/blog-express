import adminSchema from '../models/admin.schema';
import jwt from "jsonwebtoken";
import secretObj from "../config/jwt";

export default {
    findUser: async(data) => {
        const admin = await adminSchema.find()
            .where("id").equals(data.id);

        return admin;
    },

    issueToken: (user) => {
        return jwt.sign({
            id: user[0].id
        }, secretObj.secret, {
            expiresIn: '1h'
        });
    },

    authenticationToken: (token) => {
        return jwt.verify(token, secretObj.secret);
    }
}
