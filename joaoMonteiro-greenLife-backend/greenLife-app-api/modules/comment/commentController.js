const commentService = require('./commentService');
const { success } = require('../../middlewares/apiResponse');

exports.addComment = async (req, res) => {
    // (userId, productId, content) — mesma ordem do service
    const comment = await commentService.addComment(req.user.id, req.params.productId, req.body.content);
    return success(res, comment, 'Comentário adicionado com sucesso!', 201);
};

exports.getComments = async (req, res) => {
    const comments = await commentService.getComments(req.params.productId);
    return success(res, comments);
};
