const User = require('../modules/user/userModel');
const Product = require('../modules/product/productModel');

Product.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Product, { foreignKey: 'userId' });

module.exports = { User, Product };
