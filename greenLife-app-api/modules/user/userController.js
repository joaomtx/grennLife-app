const userService = require("./userService");
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
    try {
        const username = req.params.username;
        const user = await userService.getPublicProfile(username);
        return success(res, user);
    } catch (error) {
        throw error;
    }
};
