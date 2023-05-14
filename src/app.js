import express from "express";
import { productsRouter } from "./routes/products.router.js";
const app = express();
const PORT = 8080;
const productsMock = "../products.JSON";
import productsManager from "../src/helpers/productManager.js";
const productManager = new productsManager();

app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Levantando en puerto https://localhost:${PORT}`);
});

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "Error",
    msg: "No se ecuentra la ruta especificada",
    data: {},
  });
});
