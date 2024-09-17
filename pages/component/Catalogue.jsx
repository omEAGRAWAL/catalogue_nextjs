import React, { useState, useEffect } from "react";
// import CreateCatalogueForm from "../component/createCatalogue";

export default function CatalogueList() {
  const [catalogues, setCatalogues] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch catalogues from the server
    const fetchCatalogues = async () => {
      try {
        const response = await fetch("/api/catalogue/get", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("x-auth-token"), // Ensure the token is sent
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch catalogues");
        }

        const data = await response.json();
        console.log(data);
        setCatalogues(data);
      } catch (error) {
        console.error(error.message);
        setErrorMessage("Failed to load catalogues.");
      }
    };

    fetchCatalogues();
  }, []);

  return (
    <div style={styles.container}>
      {/* <CreateCatalogueForm /> */}
      <h1>Catalogue List</h1>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      <div style={styles.catalogueGrid}>
        {catalogues.length > 0 ? (
          catalogues.map((catalogue) => (
            <div key={catalogue.catalogue_id._id} style={styles.card}>
              <a href={`/product/${catalogue.catalogue_id._id}`}>
                <h3>Catalogue ID: {catalogue.catalogue_id._id}</h3>
                <p>Owner ID: {catalogue.catalogue_id.owner_id}</p>
                <h4>Products:</h4>
                <ul>
                  {catalogue.catalogue_id.product_list.map((product) => (
                    <li key={product._id}>
                      Product ID: {product.product_id} <br />
                      Can Edit: {product.can_edit ? "Yes" : "No"}
                    </li>
                  ))}
                </ul>
              </a>
            </div>
          ))
        ) : (
          <p>No catalogues found</p>
        )}
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  catalogueGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  error: {
    color: "red",
  },
};
