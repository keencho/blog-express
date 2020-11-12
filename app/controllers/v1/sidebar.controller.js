import sidebarService from "../../services/sidebar.service";

const getData = async(req, res, next) => {
    try {

        console.log(req.cookies);
        const list = await sidebarService.getData()

        return res.json({
            success: true,
            data: list
        });
    } catch (e) {
        next(e);
    }
}

export {
    getData
}
