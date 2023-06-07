import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./config.js";
import { cartsRouter } from "./routes/carts.router.js";
import { home } from "./routes/home.router.js";
import { productsAdminRouter } from "./routes/products-admin-router.js";
import { productsApiRouter } from "./routes/products-api.router.js";
import { products } from "./routes/products.router.js";
import { testChatRouter } from "./routes/test-chat.router.js";
import { connectMongo } from "./utils/connect-db.js";
import { connectSocketServer } from "./utils/connect-socket.js";

// CONFIG BASICAS Y CONEXION A BD
const app = express();
const PORT = 8080;

connectMongo();

// HTTP SERVER
const httpServer = app.listen(PORT, () => {
  console.log(`Levantando en puerto http://localhost:${PORT}`);
});

connectSocketServer(httpServer);

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
app.use("/api/carts", cartsRouter);

// PLANTILLAS
app.use("/", home);
app.use("/products", products);
app.use("/products-admin", productsAdminRouter);
app.use("/test-chat", testChatRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "Error",
    msg: "No se ecuentra la ruta especificada",
    data: {},
  });
});
