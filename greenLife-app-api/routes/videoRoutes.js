const express = require("express");
const router = express.Router();
const videoController = require("../modules/video/videoController");
const isAuthenticated = require("../middlewares/auth");
const videoMulter = require("../middlewares/videoMulter");

// Rotas protegidas
// Funcionalidade implementada no back-end, sem integração no front-end nesta fase.
router.post("/upload", isAuthenticated, videoMulter.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]), asyncHandler(videoController.uploadVideo));

router.get("/:id/stream", isAuthenticated, videoController.streamVideo);
router.get("/:id", isAuthenticated, videoController.renderVideoPage);

module.exports = router;
