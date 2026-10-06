const Product = require("./productModel");
const User = require("../user/userModel");
const sequelize = require("sequelize");

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
        include: [{
            model: User,
            attributes: ["id", "username", "fullName", "profilePicture"]
        }],
        order: [["createdAt", "DESC"]],
        limit: 20
    });
    return products;
}

async function getProductDetails(productId) {
    const product = await Product.findByPk(productId, {
        include: [{
            model: User,
            attributes: ["id", "username", "fullName", "profilePicture"]
        }]
    });

    if (!product) {
        throw new Error("Produto não encontrado.");
    }

    return { product };
}

module.exports = {
    uploadProduct,
    getAllProducts,
    getProductDetails
};
