const router = require('express').Router();


const categoryRouter = require('./category.route')
const productRouter = require('./product.route')
const orderRouter = require('./order.route')
// const transactionRouter = require('./routes/transactionRoute')
const adminProductRouter = require("./admin.product.route");
const adminCategoryRouter = require("./admin.category.route");
// const cartItemRoute = require('./cartItemRoute');
const userRouter = require("./user.route");

router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);
router.use('/adminProduct', adminProductRouter)
router.use('/adminCategory', adminCategoryRouter)
router.use('/products', productRouter);
// router.use('/product',cartItemRoute);
// router.use('/orders', orderRouter);
// router.use('/transaction', transactionRouter)
router.use('/admins', adminProductRouter);
router.use('/admins', adminCategoryRouter);
router.use('/users', userRouter)


module.exports = router
// const commentRouter = require('./routes/comment.route'