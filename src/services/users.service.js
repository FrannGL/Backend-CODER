import { UserModel } from "../DAO/models/users.model.js";
class UserService {
	async findUser(email, password) {
		const user = await UserModel.findOne(
			{ email: email, password: password },
			{
				_id: true,
				email: true,
				username: true,
				password: true,
				rol: true,
			}
		);
		return user || false;
	}

	async findUserByEmail(email) {
		const user = await UserModel.findOne(
			{ email: email },
			{
				_id: true,
				email: true,
				username: true,
				password: true,
				rol: true,
			}
		);
		return user || false;
	}

	async getAll() {
		const users = await UserModel.find(
			{},
			{
				_id: true,
				email: true,
				username: true,
				password: true,
				rol: true,
			}
		);
		return users;
	}
	async create(email, username, password, rol) {
		const existingUser = await this.findUserByEmail(email);

		if (existingUser) {
			return "El usuario ya se encuentra registrado";
		}

		const userCreated = await UserModel.create({
			email,
			username,
			password,
			rol,
		});

		return userCreated;
	}
	async updateOne({ _id, email, username, password, rol }) {
		const userUptaded = await UserModel.updateOne(
			{
				_id: _id,
			},
			{
				email,
				username,
				password,
				rol,
			}
		);
		return userUptaded;
	}

	async deleteOne(_id) {
		const result = await UserModel.deleteOne({ _id: _id });
		return result;
	}
}
export const userService = new UserService();
