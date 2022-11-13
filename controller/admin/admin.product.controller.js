const Product = require('../../model/productModel');

// const {genSaltSync, hashSync, compareSync, compare} = require('bcrypt');
const {sign} = require('jsonwebtoken');

module.exports = {
    createProduct: async(req, res) => {
        const body = req.body;
        
        let product;
        try {
            product = await Product.create({
                name: body.name,
                description: body.description,
                category_id: body.category_id,
                quantity: body.quantity,
                price: body.price,
                discount_id: body.discount_id,
                image: body.image
            });
        } catch(error) {
            return res.status(500).json({
                "success": 0,
                "message": error
            })
        }

        return res.status(200).json({
            "success": 0,
            "message": product
        })
        
    },
    getProductByProductId: async(req, res) => {
        let id = req.params.id;
        let product;
        try{
            product = await Product.findAll({
                where: {
                    productId: id
                }
            })
        }catch(err) {
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
    getProducts: async(req, res) => {
        let products;
        try{
            products = await Product.findAll();
        }catch(err) {
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
    updateProduct: async(req, res) => {
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
                image: data.image
            },{
                where: {
                    productId: id
                }
            })
        }catch(err) {
            res.status(500),json({
                "success": 0,
                "message": err
            })
        }
        return res.status(200).json({
            "success": 1,
            "message": "update successful"
        })
    },
    deleteProduct: async(req, res) => {
        let data = req.body;
        try {
            await Product.destroy({
                where: {
                    productId: req.params.id
                }
            });
        } catch(err) {
            return res.status(500).json({
                "success": 0,
                "message": err
            })
        }
        return res.json({
            success: 1,
            message: "delete successfully"
        });
        
    },
    login: (req, res) => {
        const data = req.body;
        getAdminAccount(data.username, (err, results) => {
            if(err) {
                return res.json({
                    success: 0,
                    message: "invalid username or password"
                });
            }
            // const result = compareSync(data.password, results.Password);
            console.log(data.password)
            console.log(results.password);
            if(data.password === results.password) {
                results.password = undefined;
                const jsontoken = sign({result:results}, 'qwe1234',{
                    expiresIn: "1h"
                })

                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });

            }
            else{
                return res.json({
                    success: 0,
                    message: "invalid account or password"
                });
            }
        });

    }
}