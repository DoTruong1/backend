const Comment = require('../model/comment.model');
const User = require('../model/user.model');


const createComment = async (req, res) => {
    let user_id = req.params.user_id;
    let comment = req.body.comment;
    await Comment.create({
        user_id: user_id,
        comment: comment
    })
    return res.status(200).json({
        message: "create comment successfully",
    })
}


const deleteComment = async (req, res) => {
    let user_id = req.params.user_id;
    let id = req.params.id
    let comment = await Comment.findOne({
        where: { user_id: user_id }
    })
    if (comment) {
        await Comment.destroy({
            where: {
                id: id,

            }
        })
        return res.status(200).json({
            message: "delete"
        })
    } else {
        return res.status(400).json({
            message: "cannot found comment"
        })
    }


}


module.exports = {
    createComment, deleteComment
}