import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductCatalogue = () => {
  const router = useRouter();
  const { filename } = router.query; // Access the variable part of the URL

  const [catalogue, setCatalogue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [xauthtoken, setXauthtoken] = useState(null);

  useEffect(() => {
    if (!filename) return; // Ensure filename is available before making the request

    const token = localStorage.getItem("x-auth-token");
    if (token) setXauthtoken(token);

    // Fetch data from API
    const fetchCatalogue = async () => {
      try {
        const response = await fetch(`/api/product/${filename}`); // API endpoint
        const data = await response.json();
        setCatalogue(data);
      } catch (error) {
        console.error("Error fetching catalogue:", error);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchCatalogue();
  }, [filename]); // Add filename as a dependency

  const addToCart = async (productId, quantity = 1) => {
    if (!xauthtoken) {
      window.alert("Please log in");
      return;
    }
    try {
      const response = await fetch(`/api/cart/add/${filename}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": xauthtoken,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Product added to cart successfully");
      } else {
        console.error("Error adding to cart:", data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  if (!catalogue) {
    return <div>Catalogue not found</div>; // Show error if no catalogue data
  }

  return (
    <div>
      <h1>Catalogue Products</h1>
      <div className="product-catalogue">
        {catalogue.product_list.map((item) => (
          <ProductCard
            key={item._id}
            product={item.product_id}
            canEdit={item.can_edit}
            addToCart={addToCart} // Pass addToCart as a prop
          />
        ))}
      </div>
    </div>
  );
};

// Card component to display individual product details
const ProductCard = ({ product, canEdit, addToCart }) => {
  return (
    <div className="product-card">
      <img
        src={`${product.image_url}`}
        alt={product.name}
        style={{ width: 55, height: 55 }}
      />
      <h2>{product.name}</h2>
      {product.description && <p>Description: {product.description}</p>}
      {product.price && <p>Price: ${product.price}</p>}
      <p>Can Edit: {canEdit ? "Yes" : "No"}</p>
      <p>
        Reviews:{" "}
        {product.reviews.length > 0
          ? product.reviews.join(", ")
          : "No reviews yet"}
      </p>
      <button onClick={() => addToCart(product._id)}>Add to Cart</button>
    </div>
  );
};

export default ProductCatalogue;
