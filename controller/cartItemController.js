const CartItem = require('../model/shoppingCartItems.model');
const Shopping_session = require('../model/shoppingCartModel'); 
const Product = require('../model/product.model');
const { sequelize } = require('../model/Sequelize');
module.exports = {
    createCartItem: async(req, res) => {
        const data = req.body;
        try {
            await CartItem.create({
                product_id: data.product_id,
                session_id: data.session_id,
                quantity: data.quantity
            });
            
        } catch(error) {
            return res.status(500).json({
                "success": 0,
                "message": error
            })
        }

        const [results, metadata] = await sequelize.query(`SELECT price from products where id = ${data.product_id}`);
        let ss = await Shopping_session.findAll({
            attributes: ['total'],
            where: {
                id: data.session_id
            }
        });
        let total = ss[0].total;
        console.log(total);
        total += results[0].price * data.quantity;
        console.log(total)
        try {
            await Shopping_session.update({total: total}, {
                where: {
                    id: data.session_id
                }
            })
        }catch(error) {
            return res.status(500).json({
                "success": 0,
                "message": "fail to update shopping sesson"
            });
        }

        return res.status(200).json({
            "success": 1,
            "message": "created successfully"
        })
    },

    deleteCartItem: async(req, res) => {
        const data = req.body;

        try {
            await CartItem.destroy({
                where: {
                    id: req.params.id
                }
            });
        } catch(error) {
            return res.status(500).json({
                "success": 0,
                "message": error
            });
        }
    },

    getCartItems: async(req, res) => {
        const data = req.body;
        let cartItems;
        let shopping_session;
        const user_id = data.user_id;
        try {
            shopping_session = await Shopping_session.findOne({
                where: {
                    user_id : user_id
                }
            });
        } catch(error) {
            return res.status(500).json({
                "success": 0,
                "message": error
            });
        }
        try {
            [results, metadata] = await sequelize.query('SELECT c.id,c.product_id,c.quantity, p.name, p.Description, p.image from cart_item c join products p on p.id = c.product_id')
            // cartItems = await CartItem.findAll({
            //     where: {
            //         session_id: shopping_session.id
            //     }
            // });
            console.log(shopping_session.user_id);
            cartItems = results;
        } catch(err) {
            return res.status(500).json({
                "success": 0,
                "message": err
            });
        }
        return res.status(200).json({
            "message":1,
            "shopping_session": shopping_session,
            "cart_items": cartItems
        });
    }
}