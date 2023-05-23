import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import ProductManager from "./helpers/productManager.js";
const prodMan = new ProductManager();
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { products } from "./routes/home.router.js";
import { realTimeProductsRouter } from "./routes/real-time-products-router.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// HTTP SERVER
const httpServer = app.listen(PORT, () => {
  console.log(`Levantando en puerto http://localhost:${PORT}`);
});

// SOCKET SERVER
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Nuevo usuario conectado a traves de ${socket.id}`);

  socket.on("new-product", async (newProd) => {
    try {
      await prodMan.addProduct({ ...newProd });
      const productsList = await prodMan.getProducts();
      console.log(productsList);
      socketServer.emit("products", productsList);
    } catch (err) {
      console.log(err);
    }
  });
});

// ENDPOINTS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// PLANTILLAS
app.use("/home", products);
app.use("/realtimeproducts", realTimeProductsRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "Error",
    msg: "No se ecuentra la ruta especificada",
    data: {},
  });
});
