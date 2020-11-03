import postRepo from '../../repository/post.repository';

const create = async(req, res, next) => {
    try {
        await postRepo.create();

        return res.json({
            success: true,
            data: null
        });
    } catch (e) {
        next(e);
    }

};

const listAll = async(req, res, next) => {
    try {
        const list = await postRepo.listAll();

        return res.json({
            success: true,
            data: list
        })
    } catch (e) {
        next(e);
    }
}

export {
    create,
    listAll
}
