import express from "express";
import { productService } from "../services/products.service.js";
export const products = express.Router();

products.get("/", async (req, res) => {
  try {
    const data = await productService.getAll({});
    const title = "Listado de Productos";
    return res.status(200).render("products", { title, data });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});
