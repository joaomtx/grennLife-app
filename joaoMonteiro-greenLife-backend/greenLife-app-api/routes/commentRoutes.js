const express = require("express");
const router = express.Router();
const commentController = require("../modules/comment/commentController");
const isAuthenticated = require("../middlewares/auth");

// Funcionalidade implementada no back-end, sem integração no front-end nesta fase.
router.post("/:productId", isAuthenticated, commentController.addComment);
router.get("/:productId", commentController.getComments);

module.exports = router;
