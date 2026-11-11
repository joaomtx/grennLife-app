const userService = require("./userService");
const productService = require("../product/productService");
const jwtConfig = require('../../config/jwt');
const { success } = require('../../middlewares/apiResponse');

exports.register = async (req, res) => {
    const { username, email, password, fullName } = req.body;
    try {
        await userService.registerUser(username, email, password, fullName);
        return success(res, null, 'Conta criada com sucesso!', 201);
    } catch (error) {
        throw error;
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        const token = jwtConfig.generateToken({ id: user.id, username: user.username });
        return success(res, { user: { id: user.id, username: user.username }, token }, 'Login realizado com sucesso.');
    } catch (error) {
        throw error;
    }
};

exports.logout = (req, res) => {
    return success(res, null, 'Logout realizado com sucesso.');
};

exports.getMyProfile = async (req, res) => {
    const user = await userService.getUserProfile(req.user.id);
    return success(res, user);
};

exports.updateProfile = async (req, res) => {
    try {
        const { fullName, bio } = req.body;
        const userId = req.user.id;
        const newProfilePictureFilename = req.file ? req.file.filename : null;

        const updatedUser = await userService.updateUserProfile(userId, fullName, bio, newProfilePictureFilename);

        return success(res, updatedUser, 'Perfil atualizado com sucesso!');
    } catch (error) {
        throw error;
    }
};

exports.getPublicProfile = async (req, res) => {
    const viewerId = req.user ? req.user.id : null;
    const profile = await userService.getPublicProfile(req.params.username, viewerId);
    return success(res, profile);
};

exports.getMyProducts = async (req, res) => {
    const products = await userService.getMyProducts(req.user.id);
    return success(res, products);
};

exports.getProductForEdit = async (req, res) => {
    const product = await userService.getProductForEdit(req.params.id, req.user.id);
    return success(res, product);
};

exports.updateProduct = async (req, res) => {
    const { title, description } = req.body;
    const product = await userService.updateProduct(
        req.params.id,
        req.user.id,
        { title, description },
        req.file
    );
    return success(res, product, 'Produto atualizado com sucesso!');
};

exports.deleteProduct = async (req, res) => {
    await userService.deleteProduct(req.params.id, req.user.id);
    return success(res, null, 'Produto excluído com sucesso!');
};

exports.getFeed = async (req, res) => {
    const feed = await productService.getFeedProducts(req.query.page, req.query.limit);
    return success(res, feed);
};
