import mainService from "../../service/main.service";

const listMain = (req, res, next) => {
    try {
        console.time("dbsave");
        const list = mainService.listMain()
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
