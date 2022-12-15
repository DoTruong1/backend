const router = require('express').Router();
const {checkToken} = require('../auth/middleware/token_validation');
const {createCartItem, deleteCartItem, getCartItems}  = require('../controller/cartItemController');

router.post('/cartItem', checkToken, createCartItem);
router.delete('/cartItem/:id', checkToken, deleteCartItem);
router.get('/cartItems',checkToken, getCartItems);

module.exports = router;
