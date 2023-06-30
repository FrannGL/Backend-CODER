import express from "express";
export const loginRouter = express.Router();
import { userService } from "../services/users.service.js";

loginRouter.get("/", async (req, res) => {
	try {
		const title = "Fuego Burgers® - Login";
		return res.status(200).render("login", { title });
	} catch (err) {
		console.log(err);
		res
			.status(501)
			.send({ status: "error", msg: "Error en el servidor", error: err });
	}
});

loginRouter.post("/", async (req, res) => {
	const { email, password } = req.body;
	const userExist = await userService.findUser(email, password);
	if (userExist) {
		req.session.user = userExist.username;
		req.session.rol = userExist.rol;
		res.redirect("/products");
	} else {
		res.send("Email inexistente o contraseña incorrecta");
	}
});
