const Catalogue = require("../models/Catalogue");
const User = require("../models/User");
const Cart = require("../models/Cart");

exports.createCatalogue = async (req, res) => {
  const { catalogue_name } = req.body;
  const owner_id = req.user.id; // Ensure req.user.id contains the authenticated user's ID

  try {
    // Create a new Cart instance
    const cart = new Cart(); // You can optionally add initial properties if needed
    const cartdata = await cart.save();
    console.log(cartdata, "cart");

    // Create a new Catalogue instance
    const catalogue = new Catalogue({
      catalogue_name,
      owner_id,
      cart_id: cartdata._id, // Use _id from cartdata
    });
    await catalogue.save();
    console.log(catalogue);

    // Find the user and update their catalogue list
    const user = await User.findById(owner_id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Push the catalogue ID and name to the user's catalogue list
    user.catalogues.push({ catalogue_id: catalogue._id, catalogue_name });
    await user.save();
    console.log(user);

    // Return the catalogue as the response
    res.status(201).json(catalogue); // Use status 201 for successful creation
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getCatalogue = async (req, res) => {
  try {
    // Find the user and populate the catalogue lis
    const user = await User.findById(req.user.id).populate(
      "catalogues.catalogue_id"
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(user);
    res.json(user.catalogues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteCatalogue = async (req, res) => {
  const { catalogue_id } = req.params;
  const owner_id = req.user.id;
  console.log(catalogue_id, owner_id);
  try {
    // Find the catalogue and delete it
    let catalogue = await Catalogue.findById(catalogue_id);
    if (!catalogue) {
      return res.status(404).json({ msg: "Catalogue not found" });
    }

    // Check if the user is the owner of the catalogue

    // Remove the catalogue from the user's catalogue list
    const user = await User.findById(owner_id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.catalogues = user.catalogues.filter(
      (cat) => cat.catalogue_id.toString() !== catalogue_id
    );
    await user.save();

    // Delete the catalogue
    catalogue = await Catalogue.findByIdAndDelete(catalogue_id);
    res.json({ msg: "Catalogue deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
