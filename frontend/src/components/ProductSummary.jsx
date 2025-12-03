// src/components/ProductSummary.jsx
import React from "react";

export default function ProductSummary({ totalProducts, totalValue }) {
  return (
    <div className="summary">
      <p>จำนวนสินค้าทั้งหมด (หลังจากกรอง): {totalProducts} รายการ</p>
      <p>
        มูลค่ารวม (Total Value): {totalValue.toLocaleString("th-TH", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        บาท
      </p>
    </div>
  );
}
