import express from "express";
import { productService } from "../services/products.service.js";
export const productsAdminRouter = express.Router();

productsAdminRouter.get("/", async (req, res) => {
  try {
    const data = await productService.getAll({});
    const title = "Administrador de Productos";
    return res.status(200).render("products-admin", { data, title });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});
