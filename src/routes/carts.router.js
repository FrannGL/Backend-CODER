import express from "express";
import CartsManager from "../DAO/helpers/cartsManager.js";
import ProductManager from "../DAO/helpers/productManager.js";
import { cartsServices } from "../services/carts.service.js";
import { productService } from "../services/products.service.js";
export const cartsRouter = express.Router();
const prodMan = new ProductManager();
const cartMan = new CartsManager();

cartsRouter.get("/", async (req, res) => {
  try {
    const data = await cartsServices.getAll();
    const queryLimit = req.query.limit;
    if (queryLimit && queryLimit <= 10) {
      const search = data.slice(0, queryLimit);
      res.status(200).json({
        status: "success",
        msg: `Mostrando los ${queryLimit} carritos`,
        payload: search,
      });
    } else {
      res.status(200).json({
        status: "success",
        msg: `Mostrando los carritos`,
        payload: { data },
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});

cartsRouter.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const cartEncontrado = cartsServices.getAllById(id);
    if (cartEncontrado) {
      res.status(200).json({
        status: "success",
        msg: `Mostrando el producto con ID ${cartEncontrado.id}`,
        payload: cartEncontrado,
      });
    } else {
      res.status(404).send({ status: "error", msg: "Carrito no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: error });
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    await cartsServices.create();
    res.status(200).json({
      status: "success",
      msg: `Producto Agregado Correctamente`,
      payload: {},
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: "error", msg: "Error", error: error });
  }
});
