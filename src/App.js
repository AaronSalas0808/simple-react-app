// src/App.js
import React, { useEffect, useState } from "react";
import { fetchProducts } from "./services/api";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data.content);
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Productos</h1>
      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando productos...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;