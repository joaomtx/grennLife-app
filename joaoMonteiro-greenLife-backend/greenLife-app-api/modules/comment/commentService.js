const Comment = require("./commentModel");
const Product = require("../product/productModel");
const User = require("../user/userModel");


async function addComment(productId, userId, content) {
    if (!content || content.trim() === "") {
        throw new Error("O comentário não pode ser vazio.");
    }

    const comment = await Comment.create({
        content: content.trim(),
        userId,
        productId
    });
    await Product.increment("commentsCount", { where: { id: productId } });

    const newComment = await Comment.findByPk(comment.id, {
        include: [{
            model: User,
            attributes: ["username", "fullName", "profilePicture"]
        }]
    });
    return newComment;
}

async function getCommentsByProductId(productId) {
    const comments = await Comment.findAll({
        where: { productId },
        include: [{
            model: User,
            attributes: ["username", "fullName", "profilePicture"]
        }],
        order: [["createdAt", "DESC"]]
    });
    return comments;
}


module.exports = {
    addComment,
    getCommentsByProductId
};
