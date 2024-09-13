// const express = require("express");
// const router = express.Router();
// const { uploadFile } = require("../services/fileService");
// const auth = require("../middlewares/auth");
// const multer = require("multer");
// const upload = multer();

// router.post("/upload", [auth, upload.single("file")], async (req, res) => {
//   try {
//     console.log(req.file);
//     if (!req.file) {
//       console.log("No file provided.");
//       return res.status(400).json({  });
//     }
//     console.log("req.formData.file");
//     const result = await uploadFile(req.formData.file);
//     res.json({ fileUrl: result.Location });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { uploadFile } = require("../services/fileService"); // Assuming this is your function to upload files
const auth = require("../middlewares/auth"); // Assuming this is your authentication middleware
const multer = require("multer");
const upload = multer(); // Initialize multer for handling file uploads


router.post("/upload", [auth, upload.single("file")], async (req, res) => {
  try {
    if (!req.file) {
      console.log("No file provided. Empty upload successful.");
      return res.status(400).json({ msg: "No file uploaded" });
    }
    console.log(req.user); // Log the file object to see its properties

    // Assuming `uploadFile` handles uploading the file (to local storage, S3, etc.)
    const result = await uploadFile(req.file);
    console.log(result);
    // Use req.file, not req.formData.file
    res.json({ fileUrl: result.Location }); // Assuming uploadFile returns a Location field for the uploaded file
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
