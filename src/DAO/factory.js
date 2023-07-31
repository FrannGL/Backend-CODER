// import mongoose from "mongoose";
// import env from "../config/enviroment.config.js";
// export let Products;

// switch (env.persistence) {
// 	case "MONGO":
// 		console.log("Conectado a MongoDB");
// 		mongoose.connect(env.mongoUrl);
// 		const { default: productsModel } = await import("./mongo/models/products.model.js");
// 		Products = productsModel;

// 		break;

// 	case "MEMORY":
// 		console.log("Persistencia en memoria");
// 		const { default: productsMemory } = await import("./memory/products.memory.js");
// 		Products = productsMemory;

// 		break;
// 	default:
// 		break;
// }

import mongoose from "mongoose";
import env from "../config/enviroment.config.js";
import { productsModel } from "./mongo/models/products.model.js";
import { productsMemory } from "./memory/products.memory.js";

export function getProductsModel() {
	switch (env.persistence) {
		case "MONGO":
			console.log("Conectado a MongoDB");
			mongoose.connect(env.mongoUrl);
			return productsModel;

		case "MEMORY":
			console.log("Persistencia en memoria");
			return productsMemory;

		default:
			throw new Error(`El tipo de persistencia "${env.persistence}" no es válido.`);
	}
}
