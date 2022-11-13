const Order = require('./order.model')
const OrderDetail = require('./orderDetails.model')
const Product = require('./product.model')
const User = require('./user.model')
const Payment = require('./payment.model')
const Category = require('./category.model')
const UserDetails = require('./userDetails.model')

Category.hasMany(Category,{
    foreignKey: 'parentId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


// if A has a b_id column, then A belongsTo B
User.hasMany(Order, {foreignKey:"user_id"});
Order.belongsTo(User); // tao user_id ở model Order

// Order - Product
Order.belongsToMany(Product, {through: OrderDetail, unique: false, foreignKey: 'orderId'});
Product.belongsToMany(Order, {through: OrderDetail, unique: true, foreignKey: 'productId'});

Order.hasMany(OrderDetail, {
    foreignKey: 'orderId'
});
Product.hasMany(OrderDetail,
    {
        foreignKey: 'productId',  // You need to define the foreign key
    }
);


//user and details
User.hasOne(UserDetails); // A HasOne B
UserDetails.belongsTo(User); // A BelongsTo B

OrderDetail.belongsTo(Product, {
    foreignKey: 'productId'
});
OrderDetail.belongsTo(Order, {
    foreignKey: 'orderId'
});


module.exports = {
    User, Order, OrderDetail,
    Product, Category, Payment
}