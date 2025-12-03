const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = express.Router();
app.listen(8080, () => {
    console.log(`Server is running on 8080.`);
});

let products = [];
const ALLOWED_CATEGORIES = ["อาหาร", "เครื่องดื่ม", "ของใช้", "เสื้อผ้า"];  

app.post("/api/products", (req, res) => {
  const { name, sku, price, stock, category } = req.body;

  // validate data
  if (!name || !sku || price === undefined || stock === undefined || !category) {
    return res.status(400).json({
      error: "กรุณากรอก name, sku, price, stock และ category ให้ครบ",
    });
  }

  if (!ALLOWED_CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: `category ต้องเป็นหนึ่งใน: ${ALLOWED_CATEGORIES.join(", ")}`,
    });
  }

  const existingProduct = products.find((p) => p.sku === sku);
  if (existingProduct) {
    return res.status(409).json({
      error: "รหัสสินค้า (SKU) นี้มีอยู่แล้ว ห้ามซ้ำ",
    });
  }

  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({
      error: "price ต้องเป็นตัวเลข (หน่วย: บาท) และต้องไม่ติดลบ",
    });
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({
      error: "stock ต้องเป็นจำนวนเต็ม และต้องไม่ติดลบ",
    });
  }

  const newProduct = {
    id: products.length + 1, // id ชั่วคราว
    name,
    sku,
    price,
    stock,
    category,
  };

  products.push(newProduct);

  return res.status(201).json({
    message: "เพิ่มสินค้าเรียบร้อย",
    product: newProduct,
  });
});

app.get("/api/products", (req, res) => {
  const { category } = req.query;

  let result = products;

  if (category) {
    // validate category
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({
        error: `category ต้องเป็นหนึ่งใน: ${ALLOWED_CATEGORIES.join(", ")}`,
      });
    }

    result = products.filter((p) => p.category === category);
  }

  return res.json(result);
});