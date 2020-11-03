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
    listAll
}
