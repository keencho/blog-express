import authService from '../../services/auth.service';
import secretObj from '../../config/jwt';

const login = async(req, res, next) => {
    try {

        const user = await authService.findUser({
            id: req.query.adminId
        });

        if (user.length) {
            if (user[0].pw !== req.query.adminPw) throw new Error("아이디 / 비밀번호가 일치하지 않습니다.");

            res.cookie(secretObj.cookieName, authService.issueToken(user));

            return res.json({
                success: true,
                data: null
            });
        } else {
            throw new Error("아이디 / 비밀번호가 일치하지 않습니다.");
        }
    } catch (e) {
        next(e);
    }
}

export {
    login
}
