import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function FileUpload(props) {
  const router = useRouter();
  const { filename } = router.query;
  const [file, setFile] = useState(null);
  const [xauthtoken, setXauthtoken] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    // Check authentication status in the client side
    const token = localStorage.getItem("x-auth-token");
    setXauthtoken(token);
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload and product creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setResponseMessage("Please select a file to upload.");
      return;
    }

    // First step: Upload the file and get the image URL
    const fileFormData = new FormData();
    fileFormData.append("file", file);

    try {
      const fileResponse = await fetch("/api/files/upload", {
        method: "POST",
        body: fileFormData,
        headers: {
          "x-auth-token": xauthtoken,
        },
      });

      const fileData = await fileResponse.json();
      if (!fileResponse.ok) {
        setResponseMessage(`File upload failed: ${fileData.msg}`);
        return;
      }

      const imageUrl = fileData; // Assuming the server returns the image URL

      // Second step: Create product with name, description, price, and image URL
      const productResponse = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": xauthtoken,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          image_url: imageUrl.fileUrl,
          catalogue_id: props.catId,
        }),
      });

      const productData = await productResponse.json();
      if (productResponse.ok) {
        setResponseMessage("Product created successfully!");
      } else {
        setResponseMessage(`Product creation failed: ${productData.msg}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error uploading file or creating product.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        maxHeight: "400px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Upload a File and Create a Product
      </h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {/* File upload */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Upload Image
          </label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            required
            style={{ padding: "8px", width: "100%" }}
          />
        </div>

        {/* Product details */}
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Name Of Product
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name Of Product"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ padding: "8px", width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="description"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            style={{ padding: "8px", width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="price"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
            style={{ padding: "8px", width: "100%" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Product
        </button>
      </form>
      <p
        style={{
          textAlign: "center",
          color: responseMessage.includes("successfully") ? "green" : "red",
        }}
      >
        {responseMessage}
      </p>
    </div>
  );
}
