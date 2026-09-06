const express = require("express");
const router = express.Router();
const likeController = require("../modules/like/likeController");
const isAuthenticated = require("../middlewares/auth");

// Funcionalidade implementada no back-end, sem integração no front-end nesta fase.
router.post("/:videoId/toggle", isAuthenticated, likeController.toggleLike);
router.get("/:videoId/status", isAuthenticated, likeController.checkLikeStatus);

module.exports = router;
