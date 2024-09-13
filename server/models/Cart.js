const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  
  // user_id:mongoose.Schema.Types.ObjectId , // Reference to the Users collection
  catalogue_id: mongoose.Schema.Types.ObjectId , // Reference to the Catalogues collection
  items: [
    {
      product_id:{type:mongoose.Schema.Types.ObjectId,ref:"Product" }, // Reference to the Products collection
      price: Number,
      quantity: Number,
    },
  ],
});

modules.export = mongoose.model("Cart", CartSchema);
