import postService from '../../services/post.service';
import JsonResult from '../../utils/json.utils';

const write = async(req, res, next) => {
    try {

        const validatePost = await postService.validate(req.query);

        if (validatePost.success) {
            if (validatePost.isCreate) {
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
    get,
    list,
    listInfiniteScroll,
    listAll
}
