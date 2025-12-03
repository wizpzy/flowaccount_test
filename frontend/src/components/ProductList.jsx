// src/components/ProductList.jsx
import React, { useState, useEffect } from "react";
import { initialProducts, categories } from "../data/mockProducts";
import ProductTable from "./ProductTable";
import ProductSummary from "./ProductSummary";
import ProductForm from "./ProductForm";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "ทั้งหมด"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const totalValue = filteredProducts.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );

  const handleSell = (id) => {
    let sold = false;

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id && p.stock > 0) {
          sold = true;
          return { ...p, stock: p.stock - 1 };
        }
        return p;
      })
    );

    if (sold) {
      alert("ขายสำเร็จ!");
    } else {
      alert("สินค้าไม่พร้อมขาย");
    }
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [
      ...prev,
      {
        ...newProduct,
        id: Date.now(),
        createdAt: new Date(),
      },
    ]);
    alert("เพิ่มสินค้าเรียบร้อย");
  };

  const existingSkus = products.map((p) => p.sku);
  const filterOptions = ["ทั้งหมด", ...categories];

  return (
    <div className="container">
      <h1>ระบบจัดการสินค้า (Product Management)</h1>

      {/* Filter */}
      <div className="filter-bar">
        <label htmlFor="categoryFilter">หมวดหมู่: </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {filterOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <ProductTable products={filteredProducts} onSell={handleSell} />

      {/* Summary */}
      <ProductSummary
        totalProducts={filteredProducts.length}
        totalValue={totalValue}
      />

      {/* Form */}
      <ProductForm
        onAddProduct={handleAddProduct}
        existingSkus={existingSkus}
        categories={categories}
      />
    </div>
  );
}
