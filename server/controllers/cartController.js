const Cart = require("../models/Cart");

exports.addCart = async (req, res) => {
  const userId = req.user.id;
  const { catalogId } = req.params;
  console.log(userId);
  console.log(catalogId);

  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId, catalogId });

  if (cart) {
    // Check if the product already exists in the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex !== -1) {
      // Update quantity if product exists
      cart.products[productIndex].quantity += quantity;
    } else {
      // Add new product if not already in cart
      cart.products.push({ productId, quantity });
    }
  } else {
    // Create a new cart if none exists for this catalog and user
    cart = new Cart({
      userId,
      catalogId,
      products: [{ productId, quantity }],
    });
  }

  await cart.save(); // Now, this will work for both existing and new carts
  res.status(200).json({ message: "Product added to cart", cart });
};

exports.getCart = async (req, res) => {
  const userId = req.user.id;
  const { catalogId } = req.params;
  console.log(userId);
  console.log(catalogId);
  const cart = await Cart.findOne({ userId, catalogId }).populate(
    "products.productId"
  );
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res.status(200).json(cart);
};

exports.removeProduct = async (req, res) => {
  const { productId, catalogId } = req.params;
  const userId = req.user.id;

  try {
    // Find the cart that belongs to the user and matches the catalog ID
    const cart = await Cart.findOne({ userId, catalogId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the product in the cart's products array
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Remove the product from the array
    cart.products.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Server error" });
  }
};
