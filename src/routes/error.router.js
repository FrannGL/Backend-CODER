import express from "express";
export const errorRouter = express.Router();

errorRouter.get("/", async (req, res) => {
	try {
		const errorMsg = req.session.errorMsg;
		req.session.errorMsg = null;
		const title = "Fuego Burgers®";
		return res.status(200).render("error", { title, errorMsg });
	} catch (err) {
		console.log(err);
		res.status(501).send({ status: "error", msg: "Error en el servidor", error: err });
	}
});
