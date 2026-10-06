const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Product = sequelize.define('Product', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    imagePath: { type: DataTypes.STRING, allowNull: false },
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    likesCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    commentsCount: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
    tableName: 'products'
});

module.exports = Product;
