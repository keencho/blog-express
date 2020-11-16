import authService from '../../services/auth.service';
import jwtObj from "../../config/jwt";

const login = async(req, res, next) => {
    try {

        const user = await authService.findUser({
            id: req.query.adminId
        });

        if (user.length) {
            if (user[0].pw !== req.query.adminPw) throw new Error("아이디 / 비밀번호가 일치하지 않습니다.");

            return res.json({
                success: true,
                data: authService.issueToken(user)
            });
        } else {
            throw new Error("아이디 / 비밀번호가 일치하지 않습니다.");
        }
    } catch (e) {
        next(e);
    }
}

const authentication = async(req, res, next) => {
    try {

        authService.authenticationToken(req.headers[jwtObj.sessionName]);

        return res.json({
            success: true,
            data: null
        });
    } catch (e) {
        next(e);
    }
}

export {
    login,
    authentication
}
