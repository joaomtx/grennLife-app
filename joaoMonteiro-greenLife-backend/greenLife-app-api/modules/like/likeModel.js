const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('../user/userModel');
const Product = require('../product/productModel');

const Like = sequelize.define('Like', {});

Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Like, { foreignKey: 'userId' });
Product.hasMany(Like, { foreignKey: 'productId' });

module.exports = Like;
