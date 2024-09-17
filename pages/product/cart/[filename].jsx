import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const router = useRouter();
  const { filename } = router.query; // Access the variable part of the URL
  const [cartItems, setCartItems] = useState([]);
  const [xauthtoken, setXAuthToken] = useState("");
  const [error, setError] = useState(null);

  // Fetch cart data when component is mounted or filename changes
  useEffect(() => {
    if (!filename) return;

    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      window.alert("Please log in first");
      return;
    }
    setXAuthToken(token);

    const fetchCart = async () => {
      try {
        const response = await fetch(`/api/cart/get/${filename}`, {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCartItems(data.products);
        } else {
          setError("Failed to fetch cart");
        }
      } catch (err) {
        setError("An error occurred while fetching the cart");
      }
    };

    fetchCart();
  }, [filename]); // Add filename as a dependency

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`/api/cart/remove/${filename}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": xauthtoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        // Remove item from UI
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId._id !== productId)
        );
      } else {
        setError("Failed to remove item from cart");
      }
    } catch (err) {
      setError("An error occurred while removing the item");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.productId._id}>
            <h3>{item.productId.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.productId._id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
