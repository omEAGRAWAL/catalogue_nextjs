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

exports.getCart =async (req, res) => { 
     const userId = req.user.id;
    const { catalogId } = req.params;
    console.log(userId);
    console.log(catalogId);
    const cart = await Cart.findOne({ userId, catalogId }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  };
  