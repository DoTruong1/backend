const {Sequelize ,DataTypes } = require('sequelize');

const sequelize = require('./Sequelize').sequelize;
const Product = sequelize.define('product', 
    {
        productId: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true
        },
        name:{
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        } ,
        description:{ type: DataTypes.STRING, defaultValue: 'không có link ảnh'},
        categoryId:{ type: DataTypes.INTEGER, defaultValue: 0},
        quantityInStock:{ type: DataTypes.INTEGER(15), defaultValue: 10,},
        price: {
            type: DataTypes.DECIMAL(15,0),
            defaultValue: 0000000,

        },
        discountId: {type: DataTypes.INTEGER, defaultValue: 0},
        image: {type: DataTypes.STRING, defaultValue: `https://via.placeholder.com/150.png}`},
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
            field: 'updated_at'
        },
    },
    {   
        tableName: 'products',
        timestamps: false,
    }
)


module.exports = Product;
