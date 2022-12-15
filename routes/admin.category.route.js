const {
    createCategory,
    getCategoryByCategoryId,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('../controller/admin/admin.category.controller');

const router = require('express').Router();
// const {checkToken} = require('../auth/middleware/token_validation');
const {verifyController} = require('../auth/verifyToken')
const {upload} = require('../auth/middleware/upload');

router.post('/category', verifyController,upload.single('image'),createCategory);
router.get('/category/:id',verifyController, getCategoryByCategoryId);
router.get('/category', verifyController,getCategories);
router.patch('/category/:id',verifyController,upload.single('image'),updateCategory);
router.delete('/category/:id', verifyController,deleteCategory);


module.exports = router;