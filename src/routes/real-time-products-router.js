import express from "express";
export const realTimeProductsRouter = express.Router();
import ProductManager from "../helpers/productManager.js";
const prodMan = new ProductManager();

realTimeProductsRouter.get("/", async (req, res) => {
  try {
    const data = await prodMan.getProducts();
    return res.status(200).render("real-time-products", { data });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});
