const Product = require("./productModel");
const User = require("../user/userModel");

function getAuthorInclude() {
    return {
        model: User,
        attributes: ["id", "username", "fullName", "profilePicture"]
    };
}

function createHttpError(message, status) {
    const error = new Error(message);
    error.status = status;
    return error;
}

async function uploadProduct(title, description, imageFile, userId) {
    if (!imageFile) {
        throw new Error("Por favor, envie a imagem do produto.");
    }

    const newProduct = await Product.create({
        title,
        description,
        imagePath: imageFile.filename,
        userId,
    });

    await User.increment("productsCount", { where: { id: userId } });
    return newProduct;
}

async function getAllProducts() {
    const products = await Product.findAll({
        include: [getAuthorInclude()],
        order: [["createdAt", "DESC"]],
        limit: 20
    });
    return products;
}

async function getProductDetails(productId, viewerId = null) {
    if (!/^\d+$/.test(String(productId)) || Number(productId) < 1) {
        throw createHttpError("Produto não encontrado.", 404);
    }

    const product = await Product.findByPk(productId, {
        include: [getAuthorInclude()]
    });

    if (!product) {
        throw createHttpError("Produto não encontrado.", 404);
    }

    await product.increment("views");
    await product.reload({ include: [getAuthorInclude()] });

    return {
        product,
        isOwner: viewerId != null && Number(product.userId) === Number(viewerId)
    };
}

async function getFeedProducts(page = 1, limit = 12) {
    const pageNumber = Number(page);
    const pageSize = Number(limit);

    if (!Number.isInteger(pageNumber) || pageNumber < 1 ||
        !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 50) {
        throw createHttpError("Os parâmetros page e limit devem ser inteiros positivos (limit máximo: 50).", 400);
    }

    const offset = (pageNumber - 1) * pageSize;
    const result = await Product.findAndCountAll({
        include: [getAuthorInclude()],
        order: [["createdAt", "DESC"], ["id", "DESC"]],
        limit: pageSize,
        offset,
        distinct: true
    });

    return {
        products: result.rows,
        pagination: {
            page: pageNumber,
            limit: pageSize,
            total: result.count,
            hasMore: offset + result.rows.length < result.count
        }
    };
}

module.exports = {
    uploadProduct,
    getAllProducts,
    getProductDetails,
    getFeedProducts
};
