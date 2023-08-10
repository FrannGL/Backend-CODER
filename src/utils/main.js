// BCRYPT
import bcrypt from "bcrypt";
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

// MONGOOSE
import { connect } from "mongoose";
import env from "../config/enviroment.config.js";
export async function connectMongo() {
	try {
		await connect(env.mongoUrl);
		console.log("Conexión exitosa a la base de datos.");
	} catch (e) {
		console.log("Falló la conexión a la base de datos.");
		throw "Falló la conexion";
	}
}

// CONNECT-SOCKET
import { Server } from "socket.io";
import { MsgModel } from "../DAO/mongo/models/msgs.mongoose.js";
import { ProductsMongoose } from "../DAO/mongo/models/products.mongoose.js";

export function connectSocketServer(httpServer) {
	const socketServer = new Server(httpServer);

	socketServer.on("connection", async socket => {

		try {
			const allProducts = await ProductsMongoose.find({});
			socket.emit("products", allProducts);
		} catch (e) {
			console.log(e);
		}

		socket.on("new-product", async newProd => {
			try {
				await ProductsMongoose.create(newProd);
				const prods = await ProductsMongoose.find({});
				socketServer.emit("products", prods);
			} catch (e) {
				console.log(e);
			}
		});

		socket.on("productModified", async (id, newProd) => {
			try {
				console.log(id);
				console.log(newProd);
				await ProductsMongoose.findOneAndUpdate({ _id: id }, newProd);
				const prod = await ProductsMongoose.find({});
				socketServer.emit("products", prod);
			} catch (e) {
				console.log(e);
			}
		});

		socket.on("delete-product", async idProd => {
			try {
				await ProductsMongoose.deleteOne({ _id: idProd });
				const prods = await ProductsMongoose.find({});
				socketServer.emit("products", prods);
			} catch (e) {
				console.log(e);
			}
		});

		socket.on("msg_front_to_back", async msg => {
			try {
				await MsgModel.create(msg);
			} catch (e) {
				console.log(e);
			}
			try {
				const msgs = await MsgModel.find({});
				socketServer.emit("listado_de_msgs", msgs);
			} catch (e) {
				console.log(e);
			}
		});
	});
}

// NANO ID
import { customAlphabet } from "nanoid";

export function generateCartId() {
	const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 25);
	return nanoid();
}
