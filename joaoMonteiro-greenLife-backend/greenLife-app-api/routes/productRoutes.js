const express = require("express");
const router = express.Router();
const productController = require("../modules/product/productController");
const isAuthenticated = require("../middlewares/auth");
const optionalAuth = require("../middlewares/optionalAuth");
const productMulter = require("../middlewares/productMulter");
const asyncHandler = require("../middlewares/asyncHandler");
const { productUploadValidator } = require("../modules/user/userValidator");

// Rotas protegidas
// Multer antes do validador (multipart). Se o validador recusar, o errorHandler apaga o arquivo órfão.
router.post("/upload", isAuthenticated, productMulter, productUploadValidator, asyncHandler(productController.uploadProduct));

router.get("/:id", optionalAuth, asyncHandler(productController.getProductDetails));

module.exports = router;
