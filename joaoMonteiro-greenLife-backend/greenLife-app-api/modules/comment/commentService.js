const sequelize = require('../../config/database');
const Comment = require('./commentModel');
const Product = require('../product/productModel');
const User = require('../user/userModel');

const AUTHOR_ATTRIBUTES = ['id', 'username', 'fullName', 'profilePicture'];

function createHttpError(message, status) {
    const error = new Error(message);
    error.status = status;
    return error;
}

function isValidId(id) {
    return /^\d+$/.test(String(id)) && Number(id) >= 1;
}

/**
 * Cria o comentário e incrementa commentsCount na mesma transação.
 * Ordem dos parâmetros: (userId, productId, content) — igual no controller.
 */
async function addComment(userId, productId, content) {
    const created = await sequelize.transaction(async (t) => {
        if (!isValidId(productId)) throw createHttpError('Produto não encontrado.', 404);
        const product = await Product.findByPk(productId, { transaction: t });
        if (!product) throw createHttpError('Produto não encontrado.', 404);

        const comment = await Comment.create(
            { userId, productId: product.id, content },
            { transaction: t }
        );
        await product.increment('commentsCount', { transaction: t });
        return comment;
    });

    // Devolve o comentário JÁ com o autor, para o front mostrar sem nova busca.
    return Comment.findByPk(created.id, {
        include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }]
    });
}

async function getComments(productId) {
    if (!isValidId(productId)) throw createHttpError('Produto não encontrado.', 404);
    const product = await Product.findByPk(productId, { attributes: ['id'] });
    if (!product) throw createHttpError('Produto não encontrado.', 404);

    return Comment.findAll({
        where: { productId: product.id },
        include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }],
        order: [['createdAt', 'DESC'], ['id', 'DESC']]
    });
}

module.exports = { addComment, getComments };
