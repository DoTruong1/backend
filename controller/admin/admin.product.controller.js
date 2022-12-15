const Product = require('../../model/product.model');

// const {genSaltSync, hashSync, compareSync, compare} = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createProduct: async (req, res) => {
        const body = req.body;
        console.log(body.category_id);
        let product;
        try {
            product = await Product.create({
                name: body.name,
                description: body.description,
                categoryId: parseInt(body.categoryId),
                quantityInStock: parseInt(body.quantity),
                price: parseFloat(body.price),
                discount_id: parseInt(body.discount_id),
                image: "null"
            });
        } catch (error) {
            return res.status(500).json({
                "success": 0,
                "message": error
            })
        }

        return res.status(200).json({
            "success": 1,
            "message": product
        })

    },
    getProductByProductId: async (req, res) => {
        let id = req.params.id;
        let product;
        try {
            product = await Product.findAll({
                where: {
                    id: id
                }
            })
        } catch (err) {
            return res.status(500).json({
                "success": 0,
                "message": err
            })
        }

        return res.status(500).json({
            "success": 1,
            "data": product
        })
    },
    getProducts: async (req, res) => {
        let products;
        try {
            products = await Product.findAll();
        } catch (err) {
            return res.status(500).json({
                "success": 0,
                "message": err
            })
        }
        return res.status(200).json({
            "success": 1,
            "data": products
        })
    },
    updateProduct: async (req, res) => {
        let data = req.body;
        let id = req.params.id;
        // let salt = genSaltSync(10);
        // data.password = hashSync(data.password, salt);
        try {
            await Product.update({
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                quantityInStock: data.quantityInStock,
                price: data.price,
                discountId: data.discountId,
                image: "null"
            }, {
                where: {
                    id: id
                }
            })
        } catch (err) {
            res.status(500).json({
                "success": 0,
                "message": err
            })
        }
        return res.status(200).json({
            "success": 1,
            "message": "update successful"
        })
    },
    deleteProduct: async (req, res) => {
        let data = req.body;
        try {
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            });
        } catch (err) {
            return res.status(500).json({
                "success": 0,
                "message": err
            })
        }
        return res.json({
            success: 1,
            message: "delete successfully"
        });

    }

}