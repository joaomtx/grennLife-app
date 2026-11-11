const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const { VALIDATION } = require('../../config/constants');

// Comentário de um produto. As associações ficam em config/associations.js.
const Comment = sequelize.define('Comment', {
    content: { type: DataTypes.STRING(VALIDATION.COMMENT_MAX), allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'comments'
});

module.exports = Comment;
