const {createConfigItemSync} = require('@babel/core')
const {Sequelize, Op} = require('sequelize')
// const sequelize = require('../model/Sequelize').sequelize
const Product = require('../model/product.model')
const {sequelize} = require('../model/Sequelize')
const querystringConverter = require('sequelize-querystring-converter');
const queryParser = require("sequelize-query")(sequelize)


const getAllProducts = async (req, res, next) => {
    await Product.findAll()
        .then((allProducts) => res.status(200).json({allProducts}))
        .catch((err) => {
            const e = new Error("có lỗi khi fetch data từ server")
            e.stack = err
            next(e, req, res, next)
        })
}

const getProductList = async (req, res, next) => {
    let finalQuery =  queryParser.parse(req)
    let page = !req.params.page ? 1 : req.params.page;
    let skip = (page - 1) * 9
    finalQuery = {...finalQuery, offset: skip, limit: 9}
    let total = 0;
    if (req.query.categoryId) {
        total = await Product.count({where: {categoryId: parseInt(req.query.categoryId)}})
    } else {
        total = await Product.count();
    }

    console.log(finalQuery)


    await Product.findAll(finalQuery)
        .then((products) => {
            // data = {...data}
            return res.status(200).json({products, total:total})
        })
        .catch((err) => {
            const newErr = new Error("có lỗi khi fetch data từ server")
            newErr.stack = err
            next(newErr, req, res, next)
        })


}



const getProductByCategory = async (req, res, next) => {

    await Product.count({where: {categoryId: parseInt(req.query.category)}})
        .then((data) => res.json(data))
        .catch((err) => {
            const e = new Error("có lỗi khi fetch data từ server")
            e.stack = e
            next(e, req, res, next)
        })
}

const getTotalProduct = async (req, res, next) => {
    await Product.count()
        .then((data) => res.json(data))
        .catch((err) => {
            const e = new Error("có lỗi khi fetch data từ server")
            e.stack = e
            next(e, req, res, next)
        })
}


const getProductDetail = async (req, res, next) => {
    const productId = req.params.productId;
    // console.log(req.params.p)
    return await Product.findOne({
        where: {
            id: productId,
        }
    })
        .then((productDetail) => {
            return res.status(200).json(productDetail)
        })
        .catch((err) => {
            const newErr = new Error('Không tìm thấy sản phẩm cần tìm')
            newErr.stack = err;
            next(newErr, req, res, next)
        })
}

module.exports = {
    getAllProducts,
    getProductDetail,
    getProductList

}