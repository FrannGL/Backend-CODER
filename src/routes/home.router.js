import express from "express";
export const home = express.Router();

home.get("/", async (req, res) => {
  try {
    const title = "Listado de Productos";
    return res.status(200).render("home", { title });
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .send({ status: "error", msg: "Error en el servidor", error: err });
  }
});
