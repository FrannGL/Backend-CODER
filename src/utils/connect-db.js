import { connect } from "mongoose";
import env from "../config/enviroment.config.js";

export async function connectMongo() {
	try {
		await connect(env.mongoUrl);
		console.log("Conectado a la base de datos");
	} catch (e) {
		console.log(e);
		throw "Falló la conexion";
	}
}
