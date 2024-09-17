const mongoose = require("mongoose");

const CatalogueSchema = new mongoose.Schema({
  // owner_id: mongoose.Schema.Types.ObjectId , // Reference to the Users collection
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" }, // Reference to the
  catalogue_name: String,
  owner_id: mongoose.Schema.Types.ObjectId,
  product_list: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

      can_edit: Boolean,
    },
  ],
});

module.exports = mongoose.model("Catalogue", CatalogueSchema);
