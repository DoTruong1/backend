const {
    createCategory,
    getCategoryByCategoryId,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('../controller/admin/admin.category.controller');

const router = require('express').Router();
const {checkToken} = require('../auth/token_validation')

router.post('/category', checkToken,createCategory);
router.get('/category/:id',checkToken, getCategoryByCategoryId);
router.get('/category', checkToken,getCategories);
router.patch('/category/:id', checkToken,updateCategory);
router.delete('/category/:id', checkToken,deleteCategory);


module.exports = router;