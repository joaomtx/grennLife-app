const express = require('express');
const router = express.Router();
const userController = require('./userController');
const { registerValidator, loginValidator, profileUpdateValidator, productUpdateValidator } = require('./userValidator');
const asyncHandler = require('../../middlewares/asyncHandler');
const isAuthenticated = require('../../middlewares/auth');
const profileMulter = require('../../middlewares/profileMulter');
const optionalAuth = require('../../middlewares/optionalAuth');
const productMulter = require('../../middlewares/productMulter');

router.get('/feed', isAuthenticated, asyncHandler(userController.getFeed));
router.post('/register', registerValidator, asyncHandler(userController.register));
router.post('/login', loginValidator, asyncHandler(userController.login));
router.post('/logout', asyncHandler(userController.logout));
router.get('/profile/me', isAuthenticated, asyncHandler(userController.getMyProfile));
router.put('/profile/me', isAuthenticated, profileMulter.single('profilePicture'), 
    profileUpdateValidator, asyncHandler(userController.updateProfile));
// Depois de /profile/me, para "me" não ser lido como username.
router.get('/profile/:username', optionalAuth, asyncHandler(userController.getPublicProfile));

// CRUD do produto (Aula 09)
router.get('/my-products', isAuthenticated, asyncHandler(userController.getMyProducts));
router.get('/products/:id/edit', isAuthenticated, asyncHandler(userController.getProductForEdit));
// Multer antes do validador: sem ele, req.body ainda está vazio no multipart.
router.put('/products/:id', isAuthenticated, productMulter, productUpdateValidator,
    asyncHandler(userController.updateProduct));
router.delete('/products/:id', isAuthenticated, asyncHandler(userController.deleteProduct));

module.exports = router;
