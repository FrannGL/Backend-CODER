import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { plantillaProducts } from "./routes/plantilla-products.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.listen(PORT, () => {
  console.log(`Levantando en puerto http://localhost:${PORT}`);
});

// ENDPOINTS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// PLANTILLAS
app.use("/plantilla-products", plantillaProducts);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "Error",
    msg: "No se ecuentra la ruta especificada",
    data: {},
  });
});
