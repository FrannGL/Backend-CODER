import { UsersMongoose } from "../mongo/models/users.mongoose.js";

class UsersModel {
	async readOne(email) {
		try {
			const user = await UsersMongoose.findOne(
				{ email: email },
				{
					_id: true,
					firstName: true,
					lastName: true,
					age: true,
					email: true,
					password: true,
					role: true,
					cartID: true,
					purchase_made: true,
				}
			);
			return user;
		} catch (e) {
			console.log(e);
		}
	}

	async read() {
		try {
			const users = await UsersMongoose.find(
				{},
				{
					_id: true,
					firstName: true,
					lastName: true,
					age: true,
					email: true,
					password: true,
					role: true,
					cartID: true,
					purchase_made: true,
				}
			);
			return users;
		} catch (e) {
			console.log(e);
		}
	}

	async readById(_id) {
		try {
			const userById = await UsersMongoose.findOne({ _id });
			return userById;
		} catch (e) {
			console.log(e);
		}
	}

	async create(firstName, lastName, age, email, password, role, cartID) {
		try {
			const userCreated = await UsersMongoose.create({
				firstName,
				lastName,
				age,
				email,
				password,
				role,
				cartID,
				purchase_made: [],
			});
			return userCreated;
		} catch (e) {
			console.log(e);
		}
	}

	async update(_id, user) {
		try {
			const userUpdated = await UsersMongoose.findByIdAndUpdate(_id, user, {
				new: true,
			});
			return userUpdated;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	async delete(_id) {
		try {
			const deletedUser = await UsersMongoose.deleteOne({ _id: _id });
			return deletedUser;
		} catch (e) {
			console.log(e);
		}
	}
}

export const usersModel = new UsersModel();
