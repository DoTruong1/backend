const Category = require('./model/categoryModel');
const categories = require('./categorydata');

(async() =>{
    for(let category of categories) {
        const x =await Category.create({
        name: category.name,
        description: category.description,
        }).then();
    }
})();




