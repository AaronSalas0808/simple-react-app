// src/App.js
import React, { useEffect, useState } from "react";
import { fetchProducts } from "./services/api";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();

        console.log("Respuesta del API:", data);

        const productList = Array.isArray(data?.content)
          ? data.content
          : Array.isArray(data)
          ? data
          : [];

        setProducts(productList);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Productos</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando productos...</p>
      ) : products.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No hay productos disponibles.</p>
      )}
    </div>
  );
}

export default App;