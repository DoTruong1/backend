const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const productRouter = require('./routes/productRoute')
const categoryRouter = require('./routes/categoryRoute')
const productRouter = require('./routes/productRoute')
const orderRouter = require('./routes/orderRoute')
const transactionRouter = require('./routes/transactionRoute')
const adminProductRouter = require("./routes/admin.product.route");
const adminCategoryRouter = require("./routes/admin.category.route");

 

const sequelize = require('./model/Sequelize').sequelize;
//model
// const User = require('./model/userModel'); 

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({force: false});


app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/transaction', transactionRouter)
app.use('/admin', adminProductRouter);
app.use('/admin', adminCategoryRouter);

app.get('/', (req, res) => {
    res.send("WORK")
})



app.listen(3000, () => {
    console.log("Running")
})

module.exports = app;
