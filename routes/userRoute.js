const express = require('express');
const middleware = require("../controller/middleware");
const userController = require('../controller/userController');
const userRouter = express.Router();



userRouter.post('/register', userController.RegisterUser)
userRouter.post('/login', userController.LoginUser)
userRouter.post('/changePassword', middleware.verifyController, userController.changePassword)
userRouter.get('/viewUser/:id', middleware.verifyController, userController.viewUser)
module.exports = userRouter;