import importModels from "../DAO/factory.js";
import bcrypt from "bcrypt";
import { isValidPassword } from "../utils/main.js";

const models = await importModels();
const usersModel = models.users;

class UserService {
	async readOne(email, password) {
		try {
			const user = await usersModel.read(email);
			if (user && isValidPassword(password, user.password)) {
				return user;
			} else {
				return false;
			}
		} catch (e) {
			console.log(e);
		}
	}

	async read() {
		try {
			const users = await usersModel.read();
			return users;
		} catch (e) {
			console.log(e);
		}
	}

	// SE CREA UTILIZANDO PASSPORT

	// async create(firstName, lastName, age, email, password, role) {
	// 	try {
	// 		const existingUser = await this.readOne(email);
	// 		if (existingUser) {
	// 			return "El usuario ya se encuentra registrado";
	// 		}
	// 		const cartId = generateCartId();

	//
	// 		const hashedPassword = createHash(password);

	// 		const userCreated = await usersModel.create(
	// 			firstName,
	// 			lastName,
	// 			age,
	// 			email,
	// 			hashedPassword,
	// 			role,
	// 			cartId
	// 		);
	// 		await cartService.createCart(cartId);
	// 		return userCreated;
	// 	} catch (e) {
	// 		console.log(e);
	// 		throw e;
	// 	}
	// }

	async update(_id, user) {
		try {
			if (user.password) {
				user.password = await bcrypt.hash(user.password, 10);
			}

			const userUpdated = await usersModel.update(_id, user);
			return userUpdated;
		} catch (e) {
			console.log(e);
		}
	}

	async delete(_id) {
		try {
			const userDeleted = await usersModel.delete(_id);
			return userDeleted;
		} catch (e) {
			console.log(e);
		}
	}
}
export const userService = new UserService();
