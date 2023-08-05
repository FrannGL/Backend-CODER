import mongoose from "mongoose";
import env from "../config/enviroment.config.js";
import { productsModel } from "./mongo/models/products.model.js";
import { usersModel } from "./mongo/models/users.model.js";
import { cartsModel } from "./mongo/models/carts.model.js";
import { productsMemory } from "./memory/products.memory.js";
import { usersMemory } from "./memory/users.memory.js";
import { cartsMemory } from "./memory/carts.memory.js";

async function importModels() {
	let models;

	switch (env.persistence) {
		case "MONGO":
			console.log("Database: MongoDB");
			mongoose.connect(env.mongoUrl);
			models = {
				products: productsModel,
				users: usersModel,
				carts: cartsModel,
			};
			break;

		case "MEMORY":
			console.log("Database: Persistencia en memoria");
			models = {
				products: productsMemory,
				users: usersMemory,
				carts: cartsMemory,
			};
			break;

		default:
			throw new Error(`El tipo de persistencia "${env.persistence}" no es válido.`);
	}

	return models;
}

export default importModels;
