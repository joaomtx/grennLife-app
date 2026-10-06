const Like = require("./likeModel");
const Product = require("../product/productModel");


async function toggleLike(userId, productId) {
    const [like, created] = await Like.findOrCreate({
        where: { userId, productId },
        defaults: { userId, productId }
    });

    if (!created) {
        await like.destroy();
        await Product.decrement("likesCount", { where: { id: productId } });
        return { liked: false, message: "Unlike realizado com sucesso." };
    } else {
        await Product.increment("likesCount", { where: { id: productId } });
        return { liked: true, message: "Like realizado com sucesso." };
    }
}

async function checkLikeStatus(userId, productId) {
    const like = await Like.findOne({ where: { userId, productId } });
    return !!like;
}


module.exports = {
    toggleLike,
    checkLikeStatus
};
