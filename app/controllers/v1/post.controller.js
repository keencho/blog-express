import postService from '../../services/post.service';

const create = async(req, res, next) => {
    try {
        await postService.create();

        return res.json({
            success: true,
            data: null
        });
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

        const list = await postService.list();

        return res.json({
            success: true,
            data: list
        });
    } catch (e) {
        next(e);
    }
}

const listAll = async (req, res, next) => {
    try {
        const list = await postService.listAll();

        return res.json({
            success: true,
            data: list
        });
    } catch (e) {
        next(e);
    }
}

export {
    create,
    list,
    listAll
}
