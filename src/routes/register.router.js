import express from "express";
export const registerRouter = express.Router();
import passport from "passport";

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

registerRouter.post(
	"/",
	passport.authenticate("register", {
		failureRedirect: "/",
	}),
	(req, res) => {
		if (!req.user) {
			return res
				.status(400)
				.render("error-page", { msg: "User already exists" });
		}
		req.session.user = {
			_id: req.user._id,
			age: req.user.age,
			email: req.user.email,
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			rol: req.user.rol,
		};

		return res.status(201).redirect("/products");
	}
);

// registerRouter.get("/failregister", async (req, res) => {
// 	return res
// 		.status(400)
// 		.render("error-page", { msg: "Controla tu email e intenta más tarde" });
// });
