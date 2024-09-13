const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
//  _id:mongoose.Schema.Types.ObjectId ,
  name: String,
  email: String,
  address: String,
  password: String,
  date: String,
  catalogues: [
    {
      catalogue_id: { type: mongoose.Schema.Types.ObjectId, ref: "Catalogue" },
      catalogue_name: String,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
