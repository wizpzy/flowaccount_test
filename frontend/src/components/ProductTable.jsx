// src/components/ProductTable.jsx
import React from "react";

export default function ProductTable({ products, onSell }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>SKU</th>
          <th>ชื่อสินค้า</th>
          <th>หมวดหมู่</th>
          <th>ราคา (บาท)</th>
          <th>สต็อก</th>
          <th>การจัดการ</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => {
          const isOutOfStock = p.stock === 0;
          const isLowStock = p.stock < 10 && p.stock > 0;

          return (
            <tr
              key={p.id}
              className={isOutOfStock ? "row-out-of-stock" : ""}
            >
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price.toFixed(2)}</td>
              <td className={isLowStock ? "stock-low" : ""}>{p.stock}</td>
              <td>
                <button
                  onClick={() => {
                    if (p.stock === 0) {
                      alert("สินค้าหมด ไม่สามารถขายได้");
                      return;
                    }
                    onSell(p.id);
                  }}
                  disabled={isOutOfStock}
                >
                  ขาย
                </button>
              </td>
            </tr>
          );
        })}

        {products.length === 0 && (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              ไม่พบสินค้าในหมวดนี้
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
