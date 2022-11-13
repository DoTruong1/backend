const {
    createProduct,
    getProductByProductId,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('../controller/admin/admin.product.controller');
const {login} = require("../controller/admin/admin.login.controller")
const router = require('express').Router();
const auth = require("../auth/verifyToken")

router.post('/products', auth.verifyController,createProduct);
router.get('/products/:id',auth.verifyController, getProductByProductId);
router.get('/products', auth.verifyController,getProducts);
router.patch('/products/:id', auth.verifyController,updateProduct);
router.delete('/products/:id', auth.verifyController,deleteProduct);
router.post('/login',login);

module.exports = router;