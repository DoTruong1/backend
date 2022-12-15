const express = require('express')
const categoryRouter = express.Router()
const categoryController = require('../controller/category.controller')
const auth = require("../auth/verifyToken")

categoryRouter.get('/all',auth.verifyController, categoryController.getAllCategory)

categoryRouter.get('/id',auth.verifyController ,categoryController.getCategoryByParentId)
categoryRouter.get('/alltest', categoryController.getAllCategory)

module.exports = categoryRouter