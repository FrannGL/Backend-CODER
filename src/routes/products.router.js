import express from "express";
import { productService } from "../services/products.service.js";
export const products = express.Router();

products.get("/", async (req, res) => {
  try {
    const { pagina, price, orderBy } = req.query;
    console.log(pagina, price, orderBy);
    const data = await productService.getAllWithPagination(
      pagina,
      price,
      orderBy
    );
    const { totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage } =
      data;
    const plainProducts = data.docs.map((doc) => doc.toObject());
    const title = "Listado de Productos";
    return res.status(200).render("products", {
      title,
      plainProducts,
      totalPages,
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});
