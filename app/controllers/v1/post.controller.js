import postService from '../../services/post.service';
import JsonResult from '../../utils/json.utils';
import authService from "../../services/auth.service";
import jwtObj from "../../config/jwt";

const write = async(req, res, next) => {
    try {

        authService.authenticationToken(req.headers[jwtObj.sessionName]);

        const validatePost = await postService.validate(req.query);

        if (validatePost.success) {
            if (req.query.isCreate === 'true') {
                await postService.create(req.query);
            } else {
                await postService.update(req.query);
            }
        } else {
            return JsonResult.fail(res, validatePost.error);
        }

        return JsonResult.success(res, null);
    } catch (e) {
        next(e);
    }
};

const del = async(req, res, next) => {
    try {

        authService.authenticationToken(req.headers[jwtObj.sessionName]);

        await postService.delete(req.query);

        return JsonResult.success(res, null);
    } catch (e) {
        next(e);
    }
};

const get = async(req, res, next) => {
    try {
        const post = await postService.get(req.query.path);

        if (post === null) {
            return JsonResult.fail(res, "존재하지 않는 글입니다.");
        } else {
            return JsonResult.success(res, post);
        }
    } catch (e) {
        next(e);
    }
}

/**
 * 검색 조건에 따른 list 조회
 *
 * @param req - start, limit, tag(nullable), date(yyyy-MM, nullable)
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const list = async(req, res, next) => {
    try {

        const list = await postService.list(req.query);

        return JsonResult.success(res, list);
    } catch (e) {
        next(e);
    }
}

const listInfiniteScroll = async(req, res, next) => {
    try {
        const list = await postService.listInfiniteScroll(req.query);

        return JsonResult.success(res, list);
    } catch (e) {
        next(e);
    }
}

const listAll = async (req, res, next) => {
    try {
        const list = await postService.listAll();

        return JsonResult.success(res, list);
    } catch (e) {
        next(e);
    }
}

export {
    write,
    del,
    get,
    list,
    listInfiniteScroll,
    listAll
}
