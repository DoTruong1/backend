const {
    createCategory,
    getCategoryByCategoryId,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('../controller/admin/admin.category.controller');

const router = require('express').Router();
const auth = require("../auth/verifyToken")

router.post('/category', auth.verifyController,createCategory);
router.get('/category/:id',auth.verifyController, getCategoryByCategoryId);
router.get('/category', auth.verifyController,getCategories);
router.patch('/category/:id', auth.verifyController,updateCategory);
router.delete('/category/:id', auth.verifyController,deleteCategory);


module.exports = router;