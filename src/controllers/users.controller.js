import { userService } from "../services/users.service.js";

class UserController {
	async read(req, res) {
		try {
			const users = await userService.read();
			return res.status(200).json({
				status: "success",
				msg: "listado de usuarios",
				payload: users,
			});
		} catch (e) {
			console.log(e);
			return res.status(500).json({
				status: "error",
				msg: "something went wrong :(",
				payload: {},
			});
		}
	}
	async readByrender(req, res) {
		try {
			const data = await userService.read();
			const dataParse = data.map(user => {
				return {
					id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					age: user.age,
					email: user.email,
					password: user.password,
					role: user.role,
				};
			});
			const firstName = req.session.user.firstName;
			const role = req.session.user.role;
			const title = "Fuego Burgers® - Users";
			return res.status(200).render("users", { dataParse, title, firstName, role });
		} catch (err) {
			console.log(err);
			res.status(501).send({ status: "error", msg: "Error en el servidor", error: err });
		}
	}

	async create(req, res) {
		try {
			const { email, username, password, role } = req.body;
			if (!email || !username || !password || !role) {
				console.log("validation error: please complete email, username, password and role.");
				return res.status(400).json({
					status: "error",
					msg: "please complete email, username, password and role.",
					payload: {},
				});
			}
			const userCreated = await userService.create({
				email,
				username,
				password,
				e,
			});
			return res.status(201).json({
				status: "success",
				msg: "user created",
				payload: {
					_id: userCreated._id,
					email: userCreated.email,
					username: userCreated.username,
					password: userCreated.password,
					role: userCreated.role,
				},
			});
		} catch (e) {
			console.log(e);
			return res.status(500).json({
				status: "error",
				msg: "something went wrong :(",
				payload: {},
			});
		}
	}

	async update(req, res) {
		try {
			const { _id } = req.params;
			const { firstName, lastName, age, email, password, role } = req.body;
			if (!firstName || !lastName || !age || !email || !password || !role || !_id) {
				console.log("validation error: please complete the required fields.");
				return res.status(400).json({
					status: "error",
					msg: "please complete the required fields",
					payload: {},
				});
			}
			try {
				const userUpdated = await userService.update({
					_id,
					firstName,
					lastName,
					age,
					email,
					password,
					role,
				});
				if (userUpdated) {
					return res.status(201).json({
						status: "success",
						msg: "user uptaded",
						payload: {},
					});
				} else {
					return res.status(404).json({
						status: "error",
						msg: "user not found",
						payload: {},
					});
				}
			} catch (e) {
				return res.status(500).json({
					status: "error",
					msg: "db server error while updating user",
					payload: {},
				});
			}
		} catch (e) {
			console.log(e);
			return res.status(500).json({
				status: "error",
				msg: "something went wrong :(",
				payload: {},
			});
		}
	}

	async delete(req, res) {
		try {
			const { _id } = req.params;
			const result = await userService.delete(_id);
			if (result?.deletedCount > 0) {
				return res.status(200).json({
					status: "success",
					msg: "user deleted",
					payload: {},
				});
			} else {
				return res.status(404).json({
					status: "error",
					msg: "user not found",
					payload: {},
				});
			}
		} catch (e) {
			console.log(e);
			return res.status(500).json({
				status: "error",
				msg: "something went wrong :(",
				payload: {},
			});
		}
	}
}

export const usersController = new UserController();
