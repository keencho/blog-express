import mainService from "../../services/main.service";

const listMain = async(req, res, next) => {
    try {
        console.time("dbsave");
        const list = await mainService.listMain()
        console.timeEnd("dbsave");

        return res.json({
            success: true,
            data: list
        });
    } catch (e) {
        next(e);
    }
}

export {
    listMain
}
