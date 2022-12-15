

const notFound = (req, res, next) => {
    const err = new Error(`Không tìm thấy đường dẫn này -- ${req.originalUrl} `)
    err.status = 404;
    // console.log(err);
    // res.json({mess: err.message})
    next(err)
}



const errHandler = (err, req, res, next) => {
    
    res.status(err.status || 500).json({
        message: err.message || "Lỗi server",
        status: err.status || 500
    })
}

module.exports = {
    notFound,
    errHandler
}