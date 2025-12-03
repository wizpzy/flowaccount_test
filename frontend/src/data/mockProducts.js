// src/data/mockProducts.js

export const categories = ["อาหาร", "เครื่องดื่ม", "ของใช้", "เสื้อผ้า"];

export const initialProducts = [
  {
    id: 1,
    name: "ข้าวผัด",
    sku: "SKU001",
    price: 45,
    stock: 20,
    category: "อาหาร",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "น้ำส้ม",
    sku: "SKU002",
    price: 25,
    stock: 50,
    category: "เครื่องดื่ม",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "สบู่",
    sku: "SKU003",
    price: 35,
    stock: 0,
    category: "ของใช้",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "เสื้อยืด",
    sku: "SKU004",
    price: 299,
    stock: 5,
    category: "เสื้อผ้า",
    createdAt: new Date(),
  },
];
