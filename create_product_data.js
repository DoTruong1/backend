const Product = require('./model/product.model');
const products = require('./productdata');

(async() =>{
    for(let product of products) {
        const x =await Product.create({
        name: product.name,
        description: product.Description,
        categoryId: product.category_id,
        image : product.image,
        quantityInStock: product.quantity,
        price: product.price,
        }).then();
    }
})();




