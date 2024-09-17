const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");

const {
  addCart,
  getCart,
  removeProduct,
} = require("../controllers/cartController");

router.post("/add/:catalogId", auth, addCart);
router.get("/get/:catalogId", auth, getCart);
router.delete("/remove/:catalogId/:productId", auth, removeProduct);
// router.post("/login", loginUser);

module.exports = router;
