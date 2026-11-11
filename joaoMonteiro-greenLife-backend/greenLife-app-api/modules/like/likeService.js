const sequelize = require('../../config/database');
const Like = require('./likeModel');
const Product = require('../product/productModel');
const User = require('../user/userModel');

function createHttpError(message, status) {
    const error = new Error(message);
    error.status = status;
    return error;
}

function isValidId(id) {
    return /^\d+$/.test(String(id)) && Number(id) >= 1;
}

async function findProductOr404(productId, options = {}) {
    if (!isValidId(productId)) throw createHttpError('Produto não encontrado.', 404);
    const product = await Product.findByPk(productId, options);
    if (!product) throw createHttpError('Produto não encontrado.', 404);
    return product;
}

/**
 * Curtir/descurtir. A linha em `likes` e o contador `likesCount` mudam juntos,
 * dentro da MESMA transação: ou as duas escritas acontecem, ou nenhuma.
 */
async function toggleLike(userId, productId) {
    return sequelize.transaction(async (t) => {
        const product = await findProductOr404(productId, { transaction: t });

        const existing = await Like.findOne({
            where: { userId, productId: product.id },
            transaction: t
        });

        let liked;
        if (existing) {
            await existing.destroy({ transaction: t });
            await product.decrement('likesCount', { transaction: t });
            liked = false;
        } else {
            await Like.create({ userId, productId: product.id }, { transaction: t });
            await product.increment('likesCount', { transaction: t });
            liked = true;
        }

        await product.reload({ transaction: t });
        return { liked, likesCount: product.likesCount };
    });
}

async function getLikeStatus(userId, productId) {
    const product = await findProductOr404(productId);
    let liked = false;
    if (userId != null) {
        liked = !!(await Like.findOne({ where: { userId, productId: product.id } }));
    }
    return { liked, likesCount: product.likesCount };
}

async function isLikedBy(userId, productId) {
    if (userId == null) return false;
    return !!(await Like.findOne({ where: { userId, productId } }));
}

// GET /api/liked-products — produtos curtidos pelo usuário, curtida mais recente primeiro
async function getLikedProducts(userId) {
    return Product.findAll({
        include: [
            { model: Like, where: { userId }, attributes: ['createdAt'], required: true },
            { model: User, attributes: ['id', 'username', 'fullName', 'profilePicture'] }
        ],
        order: [[Like, 'createdAt', 'DESC'], [Like, 'id', 'DESC']]
    });
}

module.exports = { toggleLike, getLikeStatus, isLikedBy, getLikedProducts };
