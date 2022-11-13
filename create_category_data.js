const Category = require('./model/category.model');
const categories = require('./categorydata');

(async() =>{
    for(let category of categories) {
        const x =await Category.create({
        name: category.name,
        description: category.description,
        parentId: category.parentID,
        image : category.image
        }).then();
    }
})();




