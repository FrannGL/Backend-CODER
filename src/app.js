import express from "express";
import { productsRouter } from "./routes/products.router.js";
// import { cartsRouter } from "./routes/products.router.js";
const app = express();
const PORT = 8080;
import { ProductManager } from "../src/helpers/productManager.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

app.listen(PORT, () => {
  console.log(`Levantando en puerto https://localhost:${PORT}`);
});

// ENDPOINTS
app.use("/api/products", productsRouter);
// app.use("/api/carts", cartsRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "Error",
    msg: "No se ecuentra la ruta especificada",
    data: {},
  });
});
