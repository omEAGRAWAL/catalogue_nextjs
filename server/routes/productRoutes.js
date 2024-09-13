const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController.js");
const auth = require("../middlewares/auth.js");
router.post("/create",auth, createProduct);

module.exports = router;
