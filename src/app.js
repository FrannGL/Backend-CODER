import MongoStore from "connect-mongo";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import FileStore from "session-file-store";
import { __dirname } from "./config.js";
import { iniPassport } from "./config/passport.config.js";
import { cartsApiRouter } from "./routes/carts-api.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { login } from "./routes/login.router.js";
import { home } from "./routes/home.router.js";
import { productsAdminRouter } from "./routes/products-admin-router.js";
import { productsApiRouter } from "./routes/products-api.router.js";
import { productsRouter } from "./routes/products.router.js";
import { sessionsRouter } from "./routes/sessions.router.js";
import { errorRouter } from "./routes/error.router.js";
import { testChatRouter } from "./routes/test-chat.router.js";
import { usersApiRouter } from "./routes/users-api.router.js";
import { usersRouter } from "./routes/users.router.js";
import { connectMongo } from "./utils/connect-db.js";
import { connectSocketServer } from "./utils/connect-socket.js";

// CONFIG BASICAS Y CONEXION A DB
const app = express();
const PORT = 8080;
const fileStore = FileStore(session);

connectMongo();

// HTTP SERVER
const httpServer = app.listen(PORT, () => {
	console.log(`Levantando en puerto http://localhost:${PORT}`);
});

connectSocketServer(httpServer);
app.use(
	session({
		secret: "jhasdkjh671246JHDAhjd",
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://francoivangalluccio:VbfDXQUUxVvHnxna@cluster0.nwjyo8a.mongodb.net/?retryWrites=true&w=majority",
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
			ttl: 3600,
		}),
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

// CONFIG DE PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// ENDPOINTS
app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/sessions", sessionsRouter);
app.get(
	"/api/sessions/github",
	passport.authenticate("github", { scope: ["user:email"] })
);
app.get(
	"/api/sessions/githubcallback",
	passport.authenticate("github", { failureRedirect: "/error" }),
	(req, res) => {
		req.session.user = req.user.firstName;
		req.session.rol = req.user.rol;
		res.redirect("/products");
	}
);
// PLANTILLAS
app.use("/", login);
app.use("/home", home);
app.use("/products", productsRouter);
app.use("/products-admin", productsAdminRouter);
app.use("/users", usersRouter);
app.use("/cart", cartsRouter);
app.use("/test-chat", testChatRouter);
app.use("/error", errorRouter);

app.get("*", (req, res) => {
	const notFound = "Esta página no existe";
	return res.status(500).render("error", { notFound });
});
