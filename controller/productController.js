
const database = require('../configs/database')
// const sequelize = require('../model/Sequelize').sequelize
const Product = require('../model/product.model')

const getAllProducts = async (req, res,next) => {
    await Product.findAll()
        .then((data) => res.json(data)) 
        .catch((err) => next(err, req, res, next))
}

const getProductDetail = async (req, res, next) => {
    const productID = req.body["productID"];
    const rows = await Product.findOne({
        where: {
            productId: productID,
        }
    })
    if (rows) {
        return res.status(200).json({
            rows
        })
    } else {
        const err = new Error('Không tìm thấy sản phẩm cần tìm')
        next(err, req, res, next)
    }
    // res.send(rows)

}


module.exports = {
    getAllProducts,
    getProductDetail
}
