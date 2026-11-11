const User = require('./userModel');
const sequelize = require('../../config/database');
const Product = require('../product/productModel');
const Like = require('../like/likeModel');
const Comment = require('../comment/commentModel');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');


async function registerUser(username, email, password, fullName) {
    const emailExists = await User.findOne({ where: { email } });
    const usernameExists = await User.findOne({ where: { username } });
    if (emailExists || usernameExists) {
        throw new Error('Este e-mail ou usuário já está cadastrado.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        fullName
    });
    return newUser;
}



async function loginUser(login, password) {
    const user = await User.findOne({
        where: {
            [Op.or]: [{ email: login }, { username: login }]
        }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('E-mail/Usuário ou senha incorretos.');
    }
    return user;
}



async function getUserProfile(userId) {
    const user = await User.findByPk(userId, {
        attributes: ['id', 'username', 'email', 'fullName', 'bio', 'profilePicture', 'followersCount',
         'followingCount', 'productsCount']
    });
    if (!user) {
        throw new Error('Usuário não encontrado.');
    }
    return user;
}



async function updateUserProfile(userId, fullName, bio, newProfilePictureFilename) {
    const updateData = { fullName, bio };
    let oldProfilePicture = null;

    if (newProfilePictureFilename) {
        const oldUser = await User.findByPk(userId);
        if (oldUser && oldUser.profilePicture && oldUser.profilePicture !== 'default-profile.png') {
            oldProfilePicture = oldUser.profilePicture;
        }
        updateData.profilePicture = newProfilePictureFilename;
    }

    await User.update(updateData, { where: { id: userId } });

    if (oldProfilePicture) {
        const oldProfilePicPath = path.join(__dirname, '../../public/uploads/profiles', oldProfilePicture);
        fs.unlink(oldProfilePicPath, (err) => {
            if (err) console.error('Erro ao apagar foto de perfil antiga:', err);
        });
    }
    return getUserProfile(userId);
}



function createHttpError(message, status) {
    const error = new Error(message);
    error.status = status;
    return error;
}

function isValidId(id) {
    return /^\d+$/.test(String(id)) && Number(id) >= 1;
}

const PRODUCTS_DIR = path.join(__dirname, '../../public/uploads/products');

/**
 * Apaga um arquivo de imagem de produto do disco.
 * Só é chamada DEPOIS que o banco já foi atualizado (ordem banco -> disco).
 * Se a remoção falhar, só registra no log: o registro no banco já está correto.
 */
async function removeProductImage(filename) {
    if (!filename) return;
    const safeName = path.basename(filename);
    try {
        await fs.promises.unlink(path.join(PRODUCTS_DIR, safeName));
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error('Erro ao apagar imagem do produto:', err);
        }
    }
}

async function getPublicProfile(username, viewerId = null) {
    const user = await User.findOne({
        where: { username },
        attributes: ["id", "username", "fullName", "bio", "profilePicture",
            "followersCount", "followingCount", "productsCount"],
        include: [{
            model: Product,
            attributes: ["id", "title", "description", "imagePath", "views", "likesCount", "commentsCount", "userId", "createdAt"]
        }],
        // order no nível de cima: dentro do include o Sequelize ignora o order.
        order: [[Product, "createdAt", "DESC"], [Product, "id", "DESC"]]
    });
    if (!user) {
        throw createHttpError('Usuário não encontrado.', 404);
    }

    const profile = user.toJSON();
    profile.isOwner = viewerId != null && Number(viewerId) === Number(user.id);
    return profile;
}

// GET /api/my-products — itens do usuário logado, do mais novo para o mais antigo
async function getMyProducts(userId) {
    return Product.findAll({
        where: { userId },
        include: [{ model: User, attributes: ["id", "username", "fullName", "profilePicture"] }],
        order: [["createdAt", "DESC"], ["id", "DESC"]]
    });
}

// GET /api/products/:id/edit — dados para pré-preencher o formulário (só o dono)
async function getProductForEdit(productId, userId) {
    if (!isValidId(productId)) {
        throw createHttpError('Produto não encontrado.', 404);
    }

    const product = await Product.findByPk(productId, {
        attributes: ["id", "title", "description", "imagePath", "userId"]
    });

    // 1º: existe? (404)  2º: é seu? (403)
    if (!product) {
        throw createHttpError('Produto não encontrado.', 404);
    }
    if (Number(product.userId) !== Number(userId)) {
        throw createHttpError('Você não tem permissão para editar este produto.', 403);
    }

    // Sem increment em views: abrir a edição não é uma visualização.
    return product;
}

// PUT /api/products/:id — título/descrição + troca opcional da imagem
async function updateProduct(productId, userId, { title, description }, newImageFile) {
    if (!isValidId(productId)) {
        throw createHttpError('Produto não encontrado.', 404);
    }

    const product = await Product.findByPk(productId);

    // 1º: existe? (404)  2º: é seu? (403)
    if (!product) {
        throw createHttpError('Produto não encontrado.', 404);
    }
    if (Number(product.userId) !== Number(userId)) {
        throw createHttpError('Você não tem permissão para editar este produto.', 403);
    }

    const oldImage = product.imagePath;

    product.title = title;
    product.description = description ?? product.description;
    if (newImageFile) {
        product.imagePath = newImageFile.filename;
    }

    // Banco primeiro...
    await product.save();

    // ...disco depois: só apaga a imagem antiga quando o banco já aponta para a nova.
    if (newImageFile && oldImage && oldImage !== product.imagePath) {
        await removeProductImage(oldImage);
    }

    return product;
}

// DELETE /api/products/:id — registro + arquivo em disco + contador do usuário
async function deleteProduct(productId, userId) {
    if (!isValidId(productId)) {
        throw createHttpError('Produto não encontrado.', 404);
    }

    const product = await Product.findByPk(productId);

    // 1º: existe? (404)  2º: é seu? (403)
    if (!product) {
        throw createHttpError('Produto não encontrado.', 404);
    }
    if (Number(product.userId) !== Number(userId)) {
        throw createHttpError('Você não tem permissão para excluir este produto.', 403);
    }

    const imageToRemove = product.imagePath;

    // Banco primeiro, tudo numa transação: curtidas, comentários, o item e o contador do dono.
    // Se qualquer passo falhar, nada é apagado (rollback) e o arquivo continua no disco.
    await sequelize.transaction(async (t) => {
        await Like.destroy({ where: { productId: product.id }, transaction: t });
        await Comment.destroy({ where: { productId: product.id }, transaction: t });
        await product.destroy({ transaction: t });
        await User.decrement('productsCount', { where: { id: userId }, transaction: t });
    });

    // Disco depois.
    await removeProductImage(imageToRemove);
}



module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getPublicProfile,
    getMyProducts,
    getProductForEdit,
    updateProduct,
    deleteProduct
};
