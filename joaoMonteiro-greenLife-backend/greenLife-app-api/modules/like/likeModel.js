const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Curtida de um produto. As associações ficam em config/associations.js.
const Like = sequelize.define('Like', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'likes',
    indexes: [
        // "Uma pessoa só curte uma vez": a regra fica no BANCO.
        { unique: true, fields: ['user_id', 'product_id'], name: 'idx_unique_like_user_product' }
    ]
});

module.exports = Like;
