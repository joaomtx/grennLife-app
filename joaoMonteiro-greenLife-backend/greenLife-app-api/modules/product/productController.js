const productService = require("./productService");
const { success } = require("../../middlewares/apiResponse");

exports.uploadProduct = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;
        const imageFile = req.file;

        await productService.uploadProduct(title, description, imageFile, userId);

        return success(res, null, "Produto enviado com sucesso!", 201);
    } catch (error) {
        throw error;
    }
};

exports.getProductDetails = async (req, res) => {
    const productId = req.params.id;

    try {
        const { product } = await productService.getProductDetails(productId);
        return success(res, { product });
    } catch (error) {
        throw error;
    }
};
