const {
    createProduct,
    getProductByProductId,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('../controller/admin/admin.product.controller');
const {LoginAdmin, RegisterAdmin} = require("../controller/user.controller")
const router = require('express').Router();
const {verifyController} = require('../auth/verifyToken');
const {upload} = require('../auth/middleware/upload');
// const {changeStatus} = require('../controller/admin/admin.statusOrder.constroller')

router.post('/products', verifyController,upload.single('image'),createProduct);
router.get('/products/:id',verifyController, getProductByProductId);
router.get('/products', verifyController,getProducts);
router.patch('/products/:id', verifyController,upload.single('image'),updateProduct);
router.delete('/products/:id', verifyController,deleteProduct);
router.post('/login',LoginAdmin);
router.post('/register', RegisterAdmin);
// router.patch('/changeStatus/:id', changeStatus);

module.exports = router;