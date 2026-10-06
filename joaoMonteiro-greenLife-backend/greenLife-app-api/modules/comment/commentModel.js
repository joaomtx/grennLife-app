const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/userModel');
const Product = require('../product/productModel');

const Comment = sequelize.define('Comment', {
    content: { type: DataTypes.TEXT, allowNull: false }
});

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Product.hasMany(Comment, { foreignKey: 'productId' });

module.exports = Comment;
