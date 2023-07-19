class SessionsController {
	viewLogin = async (req, res) => {
		try {
			const title = "Fuego Burgers® - Login";
			return res.status(200).render("login", { title });
		} catch (err) {
			console.log(err);
			res.status(501).send({ status: "error", msg: "Error en el servidor", error: err });
		}
	};

	viewRegister = async (req, res) => {
		try {
			const title = "Fuego Burgers® - Register";
			return res.status(200).render("register", { title });
		} catch (err) {
			console.log(err);
			res.status(501).send({ status: "error", msg: "Error en el servidor", error: err });
		}
	};

	logout = async (req, res) => {
		req.session.destroy(err => {
			if (err) {
				console.error("Error al cerrar sesión:", err);
			}
			res.redirect("/");
		});
	};

	current = async (req, res) => {
		console.log(req.session);
		return res.status(200).json({ user: req.session.user });
	};

	loginUser = async (req, res) => {
		if (!req.user) {
			return res.status(400).render("error", { msg: "Usuario Inexistente" });
		}
		req.session.user = {
			_id: req.user._id,
			age: req.user.age,
			email: req.user.email,
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			role: req.user.role,
		};
		return res.redirect("/home");
	};

	registerUser = async (req, res) => {
		if (!req.user) {
			return res.status(500).render("error");
		}
		req.session.user = {
			_id: req.user._id,
			email: req.user.email,
			firstName: req.user.firstName,
			role: req.user.role,
		};
		return res.redirect("/home");
	};
}

export const sessionsController = new SessionsController();
