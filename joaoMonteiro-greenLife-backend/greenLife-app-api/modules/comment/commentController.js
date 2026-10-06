const commentService = require("./commentService");
const { success } = require("../../middlewares/apiResponse");

exports.addComment = async (req, res) => {
    const { productId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const newComment = await commentService.addComment(productId, userId, content);
        return success(res, { comment: newComment }, "Comentário adicionado com sucesso!", 201);
    } catch (error) {
        throw error;
    }
};

exports.getComments = async (req, res) => {
    const { productId } = req.params;

    try {
        const comments = await commentService.getCommentsByProductId(productId);
        return success(res, { comments });
    } catch (error) {
        throw error;
    }
};
