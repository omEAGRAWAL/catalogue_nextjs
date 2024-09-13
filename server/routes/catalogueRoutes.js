const express = require("express");
const router = express.Router();
const { createCatalogue ,getCatalogue,deleteCatalogue} = require("../controllers/catalogueController");
const auth = require("../middlewares/auth");

router.post("/create", auth, createCatalogue);
router.get("/get", auth, getCatalogue);
router.delete("/delete/:catalogue_id", auth, deleteCatalogue);



module.exports = router;
