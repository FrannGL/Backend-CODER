import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./config.js";
import { cartsApiRouter } from "./routes/carts-api.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { home } from "./routes/home.router.js";
import { productsAdminRouter } from "./routes/products-admin-router.js";
import { productsApiRouter } from "./routes/products-api.router.js";
import { products } from "./routes/products.router.js";
import { testChatRouter } from "./routes/test-chat.router.js";
import { connectMongo } from "./utils/connect-db.js";
import { connectSocketServer } from "./utils/connect-socket.js";
// import cookieParser from "cookie-parser";
import session from "express-session";

// CONFIG BASICAS Y CONEXION A BD
const app = express();
const PORT = 8080;

connectMongo();

// HTTP SERVER
const httpServer = app.listen(PORT, () => {
	console.log(`Levantando en puerto http://localhost:${PORT}`);
});

connectSocketServer(httpServer);
// app.use(cookieParser("asdjkhdfs23ASDgjk"));
app.use(
	session({
		secret: "jhasdkjh671246JHDAhjd",
		resave: true,
		saveUninitialized: true,
	})
);

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// ENDPOINTS
app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);

// PLANTILLAS
app.use("/", home);
app.use("/products", products);
app.use("/products-admin", productsAdminRouter);
app.use("/cart", cartsRouter);
app.use("/test-chat", testChatRouter);

app.get("/login", (req, res) => {
	const { username, password } = req.query;
	if (username !== "pepe" || password !== "pepepass") {
		return res.send("Login Failed");
	}
	req.session.user = username;
	req.session.admin = false;
	res.send("Login Success!");
});

app.get("/abierta", (req, res) => {
	res.send("Informacion abierta al publico.");
});

function checkLogin(req, res, next) {
	if (req.session?.user) {
		return next();
	}
	return res.status(401).send("Error de autenticacion");
}

app.get("/perfil", checkLogin, (req, res) => {
	res.send("Todo el perfil");
});

app.get("/session", (req, res) => {
	console.log(req.session);
	if (req.session?.cont) {
		req.session.cont++;
		res.send(JSON.stringify(req.session));
	} else {
		req.session.cont = 1;
		req.session.cuadro = "River";
		res.send(JSON.stringify(req.session));
	}
});

app.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.json({ status: "Logout Error", body: err });
		}
		res.send("Logout Ok!");
	});
});

app.get("*", (req, res) => {
	console.log(req.signedCookies);
	return res.status(404).json({
		status: "Error",
		msg: "No se ecuentra la ruta especificada",
		data: {},
	});
});
