import express from "express";
import ProductManager from "../DAO/helpers/productManager.js";
export const productsAdminRouter = express.Router();
const prodMan = new ProductManager();

productsAdminRouter.get("/", async (req, res) => {
  try {
    const data = await prodMan.getProducts();
    const title = "Administrador de Productos";
    return res.status(200).render("products-admin", { data, title });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});
