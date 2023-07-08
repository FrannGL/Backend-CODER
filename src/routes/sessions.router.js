import express from "express";
import passport from "passport";
export const sessionsRouter = express.Router();

sessionsRouter.get("/login", async (req, res) => {
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

sessionsRouter.get("/register", async (req, res) => {
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

sessionsRouter.get("/logout", (req, res) => {
	req.session.destroy(err => {
		if (err) {
			console.error("Error al cerrar sesión:", err);
		}
		res.redirect("/");
	});
});

sessionsRouter.get("/current", (req, res) => {
	console.log(req.session);
	return res.status(200).json({ user: req.session.user });
});

//TODO #4
sessionsRouter.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/error" }),
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
		return res.redirect("/home");
	}
);

//TODO #4
sessionsRouter.post(
	"/register",
	passport.authenticate("register", { failureRedirect: "/" }),
	(req, res) => {
		if (!req.user) {
			//TODO #5
			return res.status(500).render("error");
		}
		req.session.user = {
			_id: req.user._id,
			email: req.user.email,
			firstName: req.user.firstName,
			rol: req.user.rol,
		};
		return res.redirect("/home");
		// return res.json({ msg: "ok", payload: req.user });
	}
);
