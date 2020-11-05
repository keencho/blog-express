import postService from '../../services/post.service';
import JsonResult from '../../utils/json.utils';

const create = async(req, res, next) => {
    try {
        await postService.create();

        return JsonResult.success(res, null);
    } catch (e) {
        next(e);
    }
};

/**
 * 검색 조건에 따른 list 조회
 *
 * @param req - tag, date(yyyy-MM format) choose one or null whatever it can be...
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

const listAll = async (req, res, next) => {
    try {
        const list = await postService.listAll();

        return JsonResult.success(res, list);
    } catch (e) {
        next(e);
    }
}

export {
    create,
    list,
    listAll
}
