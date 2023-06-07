import express from "express";
import CartsManager from "../DAO/helpers/cartsManager.js";
import ProductManager from "../DAO/helpers/productManager.js";
export const cartsRouter = express.Router();
const prodMan = new ProductManager();
const cartMan = new CartsManager();

cartsRouter.get("/", async (req, res) => {
  try {
    const data = await cartMan.getCarts();
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
        msg: `Mostrando los ${data.length} carritos`,
        payload: data,
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
    const cartEncontrado = cartMan.getCartsById(id);
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
    const cartId = req.params.cid;
    const prodId = req.params.pid;

    const carts = await cartMan.getCarts();
    const products = await prodMan.getProducts();

    console.log(products[3]);

    const cartExist = carts.find((cart) => cart.id === +cartId);

    console.log(cartExist);

    const productExist = products.find((prod) => prod.id === +prodId);

    if (!productExist || !cartExist) {
      throw new Error("Carrito o Producto no existente");
    }

    if (cartExist) {
      const existingProduct = cartExist.products.find(
        (prod) => prod.idProduct === +prodId
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cartExist.products.push({ idProduct: +prodId, quantity: 1 });
      }
    } else {
      const newCart = {
        id: +cartId,
        products: [{ idProduct: +prodId, quantity: 1 }],
      };
      carts.push(newCart);
    }

    cartMan.saveCarts(carts);
    res.status(200).json({
      status: "success",
      msg: `Producto Agregado Correctamente`,
      payload: cartExist,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({ status: "error", msg: "Error", error: error });
  }
});
