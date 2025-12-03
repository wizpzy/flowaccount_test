// src/components/ProductForm.jsx
import React, { useState } from "react";

const emptyForm = {
  name: "",
  sku: "",
  price: "",
  stock: "",
  category: "",
};

export default function ProductForm({ onAddProduct, existingSkus, categories }) {
  const [form, setForm] = useState({
    ...emptyForm,
    category: categories[0],
  });
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const newErrors = {};
    const name = values.name.trim();
    const sku = values.sku.trim();
    const price = Number(values.price);
    const stock = Number(values.stock);

    if (name.length < 3) {
      newErrors.name = "ชื่อสินค้าอย่างน้อย 3 ตัวอักษร";
    }

    if (!sku) {
      newErrors.sku = "กรุณากรอก SKU";
    } else if (existingSkus.includes(sku)) {
      newErrors.sku = "SKU นี้ซ้ำแล้ว";
    }

    if (!values.price && values.price !== 0) {
      newErrors.price = "กรุณากรอกราคา";
    } else if (price <= 0) {
      newErrors.price = "ราคาต้องมากกว่า 0";
    }

    if (values.stock === "") {
      newErrors.stock = "กรุณากรอกสต็อก";
    } else if (stock < 0) {
      newErrors.stock = "สต็อกต้องมากกว่าหรือเท่ากับ 0";
    }

    if (!values.category) {
      newErrors.category = "กรุณาเลือกหมวดหมู่";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    setErrors(validate(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    onAddProduct({
      name: form.name.trim(),
      sku: form.sku.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category,
    });

    setForm({ ...emptyForm, category: categories[0] });
    setErrors({});
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    form.name &&
    form.sku &&
    form.price !== "" &&
    form.stock !== "";

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>เพิ่มสินค้าใหม่</h2>

      <div className="form-group">
        <label>ชื่อสินค้า</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label>SKU</label>
        <input
          type="text"
          name="sku"
          value={form.sku}
          onChange={handleChange}
        />
        {errors.sku && <div className="error">{errors.sku}</div>}
      </div>

      <div className="form-group">
        <label>ราคา (บาท)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && <div className="error">{errors.price}</div>}
      </div>

      <div className="form-group">
        <label>สต็อก</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
        />
        {errors.stock && <div className="error">{errors.stock}</div>}
      </div>

      <div className="form-group">
        <label>หมวดหมู่</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && <div className="error">{errors.category}</div>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        เพิ่มสินค้า
      </button>
    </form>
  );
}
