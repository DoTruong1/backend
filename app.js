const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')




// const productRouter = require('./routes/productRoute')
const categoryRouter = require('./routes/category.route')
const productRouter = require('./routes/product.route')
const orderRouter = require('./routes/order.route')
const adminProductRouter = require("./routes/admin.product.route");
const adminCategoryRouter = require("./routes/admin.category.route");
const userRouter = require("./routes/user.route");
const { notFound, errHandler } = require('./auth/middleware/error');

const sequelize = require('./model/Sequelize').sequelize;
//model
// const User = require('./model/userModel'); 

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// sequelize.sync({alter: false});


app.use('/category', categoryRouter);
app.use('/order', orderRouter);
app.use('/adminProduct', adminProductRouter)
app.use('/adminCategory', adminCategoryRouter)
app.use('/product', productRouter);
app.use('/user', userRouter)


app.use(notFound);
app.use(errHandler);



app.get('/', (req, res) => {
    res.send("WORK")
})



app.listen(3000, () => {
    console.log("Running")
})

module.exports = app;
