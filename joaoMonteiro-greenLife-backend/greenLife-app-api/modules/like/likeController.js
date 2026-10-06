const likeService = require("./likeService");
const { success } = require("../../middlewares/apiResponse");

exports.toggleLike = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    try {
        const result = await likeService.toggleLike(userId, productId);
        return success(res, result, result.message, result.liked ? 201 : 200);
    } catch (error) {
        throw error;
    }
};

exports.checkLikeStatus = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    try {
        const liked = await likeService.checkLikeStatus(userId, productId);
        return success(res, { liked });
    } catch (error) {
        throw error;
    }
};
