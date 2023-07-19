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
		console.log("Conectado a la base de datos");
	} catch (e) {
		console.log(e);
		throw "Falló la conexion";
	}
}

// CONNECT-SOCKET
import { Server } from "socket.io";
import { MsgModel } from "../DAO/models/msgs.model.js";
import { ProductsModel } from "../DAO/models/products.model.js";

export function connectSocketServer(httpServer) {
	const socketServer = new Server(httpServer);

	socketServer.on("connection", async socket => {
		console.log(`Nuevo usuario conectado a traves de ${socket.id}`);

		try {
			const allProducts = await ProductsModel.find({});
			socket.emit("products", allProducts);
		} catch (e) {
			console.log(e);
		}

		socket.on("new-product", async newProd => {
			try {
				await ProductsModel.create(newProd);
				const prods = await ProductsModel.find({});
				socketServer.emit("products", prods);
			} catch (e) {
				console.log(e);
			}
		});

		socket.on("productModified", async (id, newProd) => {
			try {
				console.log(id);
				console.log(newProd);
				await ProductsModel.findOneAndUpdate({ _id: id }, newProd);
				const prod = await ProductsModel.find({});
				socketServer.emit("products", prod);
			} catch (e) {
				console.log(e);
			}
		});

		socket.on("delete-product", async idProd => {
			try {
				await ProductsModel.deleteOne({ _id: idProd });
				const prods = await ProductsModel.find({});
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
