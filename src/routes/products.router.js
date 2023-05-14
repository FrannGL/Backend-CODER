import express from "express";
import fs from "fs/promises";
const productsMock = "../products.JSON";
export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(productsMock, "utf-8");
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

productsRouter.get("/:id", async (req, res) => {
  try {
    const data = await fs.readFile(productsMock, "utf-8");
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

productsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  productsMock = productsMock.filter((p) => p.id != id);
  return res
    .status(200)
    .json({ status: "success", msg: "Producto Eliminado", data: {} });
});

productsRouter.post("", (req, res) => {
  const producto = req.body;
  producto.id = (Math.random() * 100000).toFixed(0);
  producto.createAd = Date.now();
  productsMock.push(producto);
  return res
    .status(200)
    .json({ status: "success", msg: "Producto Creado", data: producto });
});

productsRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const producto = req.body;
  const indiceEncontrado = productsMock.findIndex((p) => p.id == id);
  productsMock[indiceEncontrado] = {
    id: productsMock[indiceEncontrado].id,
    ...producto,
  };
  return res.status(200).json({
    status: "success",
    msg: "Producto Modificado",
    data: productsMock[indiceEncontrado],
  });
});
