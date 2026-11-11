const User = require('../modules/user/userModel');
const Product = require('../modules/product/productModel');
const Like = require('../modules/like/likeModel');
const Comment = require('../modules/comment/commentModel');

// Produto <-> autor
Product.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Product, { foreignKey: 'userId' });

// Curtidas (nos dois sentidos)
Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Like, { foreignKey: 'userId' });
Product.hasMany(Like, { foreignKey: 'productId' });

// Comentários (nos dois sentidos)
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Product.hasMany(Comment, { foreignKey: 'productId' });

module.exports = { User, Product, Like, Comment };
