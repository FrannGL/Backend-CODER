import express from "express";
export const registerRouter = express.Router();
import { userService } from "../services/users.service.js";
import { createHash } from "../utils/bcrypt.js";

registerRouter.get("/", async (req, res) => {
	try {
		const title = "Fuego Burgers® - Register";
		return res.status(200).render("register", { title });
	} catch (err) {
		console.log(err);
		res
			.status(501)
			.send({ status: "error", msg: "Error en el servidor", error: err });
	}
});

registerRouter.post("/", async (req, res) => {
	const { email, username, password, rol } = req.body;
	const userExist = await userService.findUserByEmail(email);
	if (userExist) {
		res.send("El usuario ya existe!");
	} else {
		userService.create(email, username, createHash(password), rol);
		res.redirect("/");
	}
});
