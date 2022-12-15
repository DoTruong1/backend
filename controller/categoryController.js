
const database = require("../configs/database");
const {pool} = require("../configs/database");
const asyncHandler = require('express-async-handler')
const Payment = require('../model/paymentModel');


let getAllCategory = asyncHandler(async (req, res) => {
    const statement = `SELECT id, name, description
            FROM admin.product_category
            WHERE parentID is null;`
    const [rows, fields] = await database.pool.execute(statement);

    return res.json({
        message: 200,
        data: rows
    });
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