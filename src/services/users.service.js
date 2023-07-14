import { UserModel } from "../DAO/models/users.model.js";
import { isValidPassword } from "../utils/bcrypt.js";
class UserService {
	async findUser(email, password) {
		const user = await UserModel.findOne(
			{ email: email },
			{
				_id: true,
				firstName: true,
				lastName: true,
				age: true,
				email: true,
				password: true,
				role: true,
			}
		);
		if (user && isValidPassword(password, user.password)) {
			return user;
		} else {
			return false;
		}
	}

	async findUserByEmail(email) {
		const user = await UserModel.findOne(
			{ email: email },
			{
				_id: true,
				firstName: true,
				lastName: true,
				age: true,
				email: true,
				password: true,
				role: true,
			}
		);
		return user || false;
	}

	async getAll() {
		const users = await UserModel.find(
			{},
			{
				_id: true,
				firstName: true,
				lastName: true,
				age: true,
				email: true,
				password: true,
				role: true,
			}
		);
		return users;
	}
	async create(firstName, lastName, age, email, password, role) {
		const existingUser = await this.findUserByEmail(email);

		if (existingUser) {
			return "El usuario ya se encuentra registrado";
		}

		const userCreated = await UserModel.create({
			firstName,
			lastName,
			age,
			email,
			password,
			role,
		});

		return userCreated;
	}
	async updateOne({ _id, firstName, lastName, age, email, password, role }) {
		const userUptaded = await UserModel.updateOne(
			{
				_id: _id,
			},
			{
				firstName,
				lastName,
				age,
				email,
				password,
				role,
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
