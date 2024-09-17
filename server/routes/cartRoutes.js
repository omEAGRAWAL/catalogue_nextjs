const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.js");

const { addCart, getCart } = require("../controllers/cartController");

router.post("/add/:catalogId", auth, addCart);
router.get("/get/:catalogId", auth, getCart);
// router.post("/login", loginUser);

module.exports = router;
