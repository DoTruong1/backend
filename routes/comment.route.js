const express = require('express');
const commentController = require('../controller/comment.controller');
const middleware = require("../auth/verifyToken");

const commentRouter = express.Router();

commentRouter.post('/createcomment/:user_id', middleware.verifyController, commentController.createComment);
commentRouter.post('/deletecomment/:user_id/:id', middleware.verifyController, commentController.deleteComment)

module.exports = commentRouter;