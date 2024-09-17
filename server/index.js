// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoutes");
// const fileRoutes = require("./routes/fileRoutes");
// const productRoutes = require("./routes/productRoutes");
// const catalogueRoutes=require("./routes/catalogueRoutes");
// const dotenv = require("dotenv");
// const cors = require("cors");

// // const app = express();
// app.use(express.json());
// app.use(cors());

// // Database connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/files", fileRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/catalogue",catalogueRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const next = require("next");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const productRoutes = require("./routes/productRoutes");
const catalogueRoutes = require("./routes/catalogueRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cors());

  // Connect to MongoDB
  mongoose
    .connect(
      "mongodb+srv://Omagr:Password@cluster0.mfa3wse.mongodb.net/idrive?retryWrites=true&w=majority"
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

  // Use API routes
  server.use("/api/users", userRoutes);
  server.use("/api/files", fileRoutes);
  server.use("/api/product", productRoutes);
  server.use("/api/catalogue", catalogueRoutes);
  server.use("/api/cart", cartRoutes);

  // Handle Next.js page requests
  server.get("*", (req, res) => {
    return handle(req, res); // Let Next.js handle all other routes
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
  });
});
