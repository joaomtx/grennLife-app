const express = require("express");
const router = express.Router();
const productController = require("../modules/product/productController");
const isAuthenticated = require("../middlewares/auth");
const optionalAuth = require("../middlewares/optionalAuth");
const productMulter = require("../middlewares/productMulter");
const asyncHandler = require("../middlewares/asyncHandler");

// Rotas protegidas
router.post("/upload", isAuthenticated, productMulter, asyncHandler(productController.uploadProduct));

router.get("/:id", optionalAuth, asyncHandler(productController.getProductDetails));

module.exports = router;
