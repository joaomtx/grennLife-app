const express = require('express');
const router = express.Router();
const likeController = require('./likeController');
const isAuthenticated = require('../../middlewares/auth');
const optionalAuth = require('../../middlewares/optionalAuth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post('/products/:productId/toggle-like', isAuthenticated, asyncHandler(likeController.toggleLike));
router.get('/products/:productId/like-status', optionalAuth, asyncHandler(likeController.getLikeStatus));
router.get('/liked-products', isAuthenticated, asyncHandler(likeController.getLikedProducts));

module.exports = router;
