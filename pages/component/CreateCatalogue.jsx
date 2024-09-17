import React, { useState, useEffect } from "react";

const CreateCatalogueForm = () => {
  useEffect(() => {
    // Check authentication status in the client side
    const token = localStorage.getItem("x-auth-token");
    console.log(token);
    setXauthtoken(token);
  }, []);

  const [catalogueName, setCatalogueName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [xauthtoken, setXauthtoken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log(localStorage.getItem("x-auth-token"));
      const response = await fetch("/api/catalogue/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": xauthtoken,
        },
        body: JSON.stringify({ name: catalogueName }),
      });

      if (!response.ok) {
        throw new Error("Error creating catalogue");
      }

      const data = await response.json();
      console.log("Catalogue created:", data);
      // Optionally clear the form or show a success message
      setCatalogueName("");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Catalogue</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="catalogueName">Catalogue Name:</label>
          <input
            type="text"
            id="catalogueName"
            value={catalogueName}
            onChange={(e) => setCatalogueName(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Catalogue"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateCatalogueForm;
