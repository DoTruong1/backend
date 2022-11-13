const {
    createProduct,
    getProductByProductId,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('../controller/admin/admin.product.controller');
const {login} = require("../controller/admin/admin.login.controller")
const router = require('express').Router();
const {checkToken} = require('../auth/token_validation')

router.post('/products', checkToken,createProduct);
router.get('/products/:id',checkToken, getProductByProductId);
router.get('/products', checkToken,getProducts);
router.patch('/products/:id', checkToken,updateProduct);
router.delete('/products/:id', checkToken,deleteProduct);
router.post('/login',login);

module.exports = router;