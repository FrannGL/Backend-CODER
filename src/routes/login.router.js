import express from "express";
export const login = express.Router();

login.get("/", async (req, res) => {
	try {
		const title = "Fuego Burgers®";
		// const firstName = req.session.user.firstName;
		// const lastName = req.session.user.lastName;
		// const role = req.session.user.role;
		return res.status(200).render("sessions", { title });
	} catch (err) {
		console.log(err);
		res
			.status(501)
			.send({ status: "error", msg: "Error en el servidor", error: err });
	}
});
