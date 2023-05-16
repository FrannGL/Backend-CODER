import express from "express";
import fs from "fs/promises";
const productsMock = "../products.JSON";
export const productsRouter = express.Router();
import ProductManager from "../helpers/productManager.js";
const prodMan = new ProductManager("../data/Products.json");

productsRouter.get("/", async (req, res) => {
  try {
    const data = await prodMan.getProducts();
    const queryLimit = req.query.limit;
    if (queryLimit && queryLimit <= 10) {
      const search = data.slice(0, queryLimit);
      res.status(200).json({
        status: "success",
        msg: `Mostrando los ${queryLimit} productos`,
        data: search,
      });
    } else {
      res.status(200).json({
        status: "success",
        msg: `Mostrando los ${data.length} productos`,
        data: data,
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
    let id = req.params.id;
    const productoEncontrado = prodMan.getProductsById(id);
    if (productoEncontrado) {
      res.status(200).json({
        status: "success",
        msg: `Mostrando el producto con ID ${productoEncontrado.id}`,
        data: productoEncontrado,
      });
    } else {
      res.status(404).send({ status: "error", msg: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ status: "error", msg: "Error en el servidor", error: error });
  }
});

productsRouter.delete("/:id", (req, res) => {
  try {
    let id = req.params.id;
    let deleid = prodMan.deleteProduct(id);

    if (deleid) {
      return res.status(200).json({
        status: "success",
        msg: "Producto eliminado.",
        data: {},
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      msg: "Error en el servidor",
      data: {},
    });
  }
});

productsRouter.post("/", (req, res) => {
  const prod = req.body;
  const newProd = prodMan.addProduct(prod);
});

productsRouter.put("/:id", (req, res) => {
  let id = req.params.id;
  let productModified = prodMan.updateProduct(id);
  if (productModified) {
    return res.status(200).json({
      status: "success",
      msg: "Producto modificado.",
      data: productModified,
    });
  }
});
