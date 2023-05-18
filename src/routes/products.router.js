import express from "express";
export const productsRouter = express.Router();
import ProductManager from "../helpers/productManager.js";
const prodMan = new ProductManager();

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
    let productoEliminado = prodMan.deleteProduct(id);

    if (productoEliminado) {
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
  const product = req.body;
  console.log(product);
  prodMan.addProduct(product);
  res.status(201).send("Producto agregado Correctamente");
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = prodMan.getProductsById(productId);
    if (product) {
      const productModified = req.body;

      if (productModified.id && productModified.id !== productId) {
        return res.status(400).json({
          status: "error",
          msg: "No se permite modificar el ID del producto",
          data: {},
        });
      }

      prodMan.updateProduct(productId, productModified);
      res.status(200).json({
        status: "success",
        msg: "Producto actualizado",
        data: productModified,
      });
    } else {
      res.status(400).json({
        status: "error",
        msg: "El producto no existe",
        data: {},
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      data: {},
    });
  }
});
