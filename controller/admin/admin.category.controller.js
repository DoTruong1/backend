const Category = require('../../model/categoryModel');

// const {genSaltSync, hashSync, compareSync, compare} = require('bcrypt');

module.exports = {
    createCategory: async(req, res) => {
        const body = req.body;
        
        let catetory;
        try {
            catetory = await Category.create({
                name: body.name,
                description: body.description,
                parentId: body.parentId,
                image: body.image
            });
        } catch(error) {
            return res.status(500).json({
                "success": 0,
                "message": error
            })
        }

        return res.status(200).json({
            "success": 0,
            "message": catetory
        })
        
    },
    getCategoryByCategoryId: async(req, res) => {
        let id = req.params.id;
        let category;
        try{
            category = await Category.findAll({
                where: {
                    id: id
                }
            })
        }catch(err) {
            return res.status(500).json({
                "success": 0,
                "message": err
            })
        }

        return res.status(500).json({
            "success": 1,
            "data": category
        })
    },
    getCategories: async(req, res) => {
        let categories;
        try{
            categories = await Category.findAll();
        }catch(err) {
            return res.status(500).json({
                "success": 0,
                "message": err
            })
        }
        return res.status(200).json({
            "success": 1,
            "data": categories
        })
    },
    updateCategory: async(req, res) => {
        let data = req.body;
        let id = req.params.id;
        // let salt = genSaltSync(10);
        // data.password = hashSync(data.password, salt);
        try {
            await Category.update({
                name: data.name,
                description: data.description,
                parentId: data.parentId,
                image: data.image
            },{
                where: {
                    id: id
                }
            })
        }catch(err) {
            res.status(500),json({
                "success": 0,
                "message": err
            })
        }
        return res.status(200).json({
            "success": 1,
            "message": "update successful"
        })
    },
    deleteCategory: async(req, res) => {
        let data = req.body;
        try {
            await Category.destroy({
                where: {
                    id: req.params.id
                }
            });
        } catch(err) {
            return res.status(500).json({
                "success": 0,
                "message": err
            })
        }
        return res.json({
            success: 1,
            message: "delete successfully"
        });
        
    }
}