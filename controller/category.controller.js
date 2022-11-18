const Category = require("../model/category.model")

const asyncHandler = require('express-async-handler')
const Payment = require('../model/payment.model');


let getAllCategory = asyncHandler(async (req, res) => {
    await Category.findAll({
        where: {
            parentId: null,
        }
    }).then((rows) => {
        return res.status(200).json({
            code: 200,
            rows
        })
    })
});

let getCategoryByParentId = async (req, res) => {
    console.log(req.body.id)
    let id = req.body.id;
    const [rows, fields]  = await database.pool.query('SELECT id, name, image, description, parentID FROM admin.product_category WHERE parentID = ?;', [id]);
    return res.json({
        message: 200,
        data: rows
    })
}


module.exports = {
    getAllCategory,
    getCategoryByParentId
}