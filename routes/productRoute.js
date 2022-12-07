const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const auth = require("../auth/verifyToken")
const asyncHandler = require('express-async-handler')

router.get('/all',auth.verifyController, asyncHandler(productController.getAllProducts))
router.get('/detail', auth.verifyController,productController.getProductDetail)
router.get('/detailtest', asyncHandler(productController.getProductDetail))
router.get('/alltest', asyncHandler(productController.getAllProducts))

module.exports = router;