import express from "express";
import { productService } from "../services/products.service.js";
export const productsAdminRouter = express.Router();
import { checkAdmin } from "../utils/checkLogin.js";

productsAdminRouter.get("/", checkAdmin, async (req, res) => {
	try {
		const data = await productService.getAll({});
		const dataParse = data.map(prod => {
			return {
				id: prod._id,
				title: prod.title,
				description: prod.description,
				price: prod.price,
				thumbnail: prod.thumbnail,
				code: prod.code,
				stock: prod.stock,
			};
		});
		const title = "Administrador de Productos";
		const firstName = req.session.user.firstName;
		const rol = req.session.user.rol;
		return res.status(200).render("products-admin", { dataParse, title, firstName, rol });
	} catch (err) {
		console.log(err);
		res
			.status(501)
			.send({ status: "error", msg: "Error en el servidor", error: err });
	}
});
