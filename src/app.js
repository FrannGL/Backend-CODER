const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const app = express();
const PORT = 8080;
const productPath = path.join(__dirname, "../products.json");
const productManager = require("./productManager");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const data = await fs.readFile(productPath, "utf-8");
    const products = JSON.parse(data);
    const queryLimit = req.query.limit;
    if (queryLimit && queryLimit <= 10) {
      const search = products.slice(0, queryLimit);
      res.status(200).json({
        status: "success",
        msg: `Mostrando los ${queryLimit} productos`,
        data: search,
      });
    } else {
      res.status(200).json({
        status: "success",
        msg: `Mostrando los ${products.length} productos`,
        data: products,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(productPath, "utf-8");
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (product) {
      res.json({
        status: "success",
        msg: `Mostrando el producto con ID ${product.id}`,
        data: product,
      });
    } else {
      res.status(404).send({ status: "error", msg: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Levantando en puerto https://localhost:${PORT}`);
});
