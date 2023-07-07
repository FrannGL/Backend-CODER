import express from "express";
export const loginRouter = express.Router();
// import { userService } from "../services/users.service.js";
import passport from "passport";

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

// loginRouter.post("/", async (req, res) => {
// 	const { email, password } = req.body;
// 	const userExist = await userService.findUser(email, password);
// 	if (userExist) {
// 		req.session.user = userExist.username;
// 		req.session.rol = userExist.rol;
// 		res.redirect("/products");
// 	} else {
// 		res.send("Email inexistente o contraseña incorrecta");
// 	}
// });

loginRouter.post(
	"/",
	passport.authenticate("login", { failureRedirect: "/" }),
	async (req, res) => {
		if (!req.user) {
			return res
				.status(400)
				.render("error-page", { msg: "Usuario Inexistente" });
		}
		req.session.user = {
			_id: req.user._id,
			age: req.user.age,
			email: req.user.email,
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			rol: req.user.rol,
		};

		return res.redirect("/products");
	}
);

loginRouter.get("/faillogin", async (req, res) => {
	return res
		.status(500)
		.render("error-page", { msg: "Error inesperado en servidor" });
});
