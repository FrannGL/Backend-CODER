import express from "express";
import ProductManager from "../DAO/helpers/productManager.js";
export const home = express.Router();
const prodMan = new ProductManager();

home.get("/", async (req, res) => {
  try {
    const data = await prodMan.getProducts();
    const title = "Listado de Productos";
    return res.status(200).render("home", { title, data });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});
