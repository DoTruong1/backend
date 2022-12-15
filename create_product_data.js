const Product = require('./model/product.model');
const products = require('./productdata');
const randomQuotes = require('random-quotes');

// const q = randomQuotes.default().then((res) => {return res.body});


// console.log(q.body)

(async () => {
    for (let product of products) {
        const x = await Product.create({
            name: product.name,
            description: await randomQuotes.default().body,
            categoryId: product.category_id,
            image: product.image,
            quantityInStock: product.quantity,
            price: product.price,
        }).then();
    }
})();





