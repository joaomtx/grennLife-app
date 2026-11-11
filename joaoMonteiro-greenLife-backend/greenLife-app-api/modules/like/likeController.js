const likeService = require('./likeService');
const { success } = require('../../middlewares/apiResponse');

exports.toggleLike = async (req, res) => {
    // Ordem dos parâmetros igual à do service: (userId, productId)
    const result = await likeService.toggleLike(req.user.id, req.params.productId);
    const message = result.liked ? 'Produto curtido.' : 'Curtida removida.';
    return success(res, result, message, result.liked ? 201 : 200);
};

exports.getLikeStatus = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const result = await likeService.getLikeStatus(userId, req.params.productId);
    return success(res, result);
};

exports.getLikedProducts = async (req, res) => {
    const products = await likeService.getLikedProducts(req.user.id);
    return success(res, products);
};
