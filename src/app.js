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
    const queryLimit = parseInt(req.query.limit);
    if (queryLimit && queryLimit > 0) {
      res.json(products.slice(0, queryLimit));
    } else {
      res.json(products);
    }
  } catch (err) {
    console.error(err);
    res.send({ error: "Error en el servidor" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(productPath, "utf-8");
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.send({ error: "Error en el servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Levantando en puerto https://localhost:${PORT}`);
});
