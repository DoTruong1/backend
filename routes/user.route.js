const express = require('express');
const middleware = require("../auth/verifyToken");
const userController = require('../controller/user.controller');
const userRouter = express.Router();
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjY4MzMyMzgwLCJleHAiOjE2Njg0MTg3ODB9.Hvt2fRqkbjl4CkNXu_5ZqXLzvlRcTi89GdR_sb5uieU


userRouter.post('/register', userController.RegisterUser)
userRouter.post('/login', userController.LoginUser)
userRouter.post('/changePassword', middleware.verifyController, userController.changePassword)
userRouter.get('/viewUser/:id', middleware.verifyController, userController.viewUser)
module.exports = userRouter;