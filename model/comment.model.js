const { DataTypes } = require('sequelize');

const sequelize = require('./Sequelize').sequelize;

const Comment = sequelize.define('Comment',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updateAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: 'comment',
        // timestamps: true,
    }
)


module.exports = Comment