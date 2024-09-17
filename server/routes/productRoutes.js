const express = require("express");
const router = express.Router();
const { createProduct,getProduct } = require("../controllers/productController.js");
const auth = require("../middlewares/auth.js");
router.post("/create",auth, createProduct);
router.get("/:id", getProduct)

module.exports = router;
