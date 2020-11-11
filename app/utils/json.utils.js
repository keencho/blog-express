export default {
    success: (res, data) => {
        return res.json({
            success: true,
            data: data,
            error: null
        })
    },
    fail: (res, error) => {
        return res.json({
            success: false,
            data: null,
            error: error
        })
    },
    pagingData: (count, rows) => {
        return {
            count: count,
            rows: rows
        }
    }
}
