const Product = require('./model/productModel');
const products = require('./productdata');

(async() =>{
    for(let product of products) {
        const x =await Product.create({
        name: product.name,
        description: product.description,
        categoryId: product.category_id,
        image : product.image,
        quantityInStock: product.quantity,
        price: product.price,
        }).then();
    }
})();




