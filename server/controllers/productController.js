const Product = require("../models/Product");
const Catalogue = require("../models/Catalogue");

exports.createProduct = async (req, res) => {
  const { name, image_url, description, price, catalogue_id } = req.body;
  const cat_id=req.body.catalogue_id;
  const catalogue = await Catalogue.findById(cat_id);
  if (!catalogue) {
    return res.status(404).json({ error: "Catalogue not found" });
  }

  

  const newProduct = new Product({
    catalogue_id,
    name,
    image_url,
    description,
    price,
  });
  try {
    const product = await newProduct.save();
    res.json(product);

    //add the product to catalogue

    catalogue.product_list.push({
      product_id: product._id,
      can_edit: true,
    });
    
    
    await catalogue.save();

  } catch {
    res.json(404);
  }
};
