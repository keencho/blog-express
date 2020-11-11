import authService from '../../services/auth.service';
import jwt from 'jsonwebtoken';
import secretObj from '../../config/jwt';

const login = async(req, res, next) => {
    try {

        let token = jwt.sign(
{ id: "seyoung1231" },
        secretObj.secret,
{ expiresIn: '60m' }
        );

        const jwt = await authService.issueJWTToken({
            id: 'seyoung1231'
        });

        if (jwt.length > 0 && jwt[0].pw === "sw971312!@") {
            throw new Error("ㅋㅋ");
        } else {
            throw new Error("사용자 인증에 실패하였습니다.");
        }

        return res.json({
            success: true,
            data: jwt
        });
    } catch (e) {
        next(e);
    }
}

export {
    login
}
