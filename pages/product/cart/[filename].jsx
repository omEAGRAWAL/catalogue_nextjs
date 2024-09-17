import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const router = useRouter();
  const { filename } = router.query;
  const [cartItems, setCartItems] = useState([]);
  const [xauthtoken, setXAuthToken] = useState("");
  const [error, setError] = useState(null);

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
  }, [filename]);

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(
        `/api/cart/remove/${filename}/${productId}`,
        {
          method: "DELETE",
          headers: {
            "x-auth-token": xauthtoken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (response.ok) {
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.productId._id}
            style={{
              display: "flex",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              alignItems: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {item.productId.image_url && (
              <img
                src={item.productId.image_url}
                alt={item.productId.name}
                style={{
                  width: "80px",
                  height: "80px",
                  marginRight: "15px",
                  borderRadius: "8px",
                }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 10px" }}>{item.productId.name}</h3>
              {item.productId.description && (
                <p style={{ margin: "0 0 10px", color: "#555" }}>
                  {item.productId.description}
                </p>
              )}
              <p style={{ margin: "0 0 10px", fontWeight: "bold" }}>
                Quantity: {item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.productId._id)}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
