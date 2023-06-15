import { Server } from "socket.io";
import { MsgModel } from "../DAO/models/msgs.model.js";
import { ProductsModel } from "../DAO/models/products.model.js";

export function connectSocketServer(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", async (socket) => {
    console.log(`Nuevo usuario conectado a traves de ${socket.id}`);

    try {
      const allProducts = await ProductsModel.find({});
      socket.emit("products", allProducts);
    } catch (e) {
      console.log(e);
    }

    socket.on("new-product", async (newProd) => {
      try {
        await ProductsModel.create({ ...newProd });
        const prods = await ProductsModel.find({});
        console.log(prods);
        socketServer.emit("products", prods);
      } catch (e) {
        console.log(e);
      }
    });

    socket.on("deleteProduct", async (productId) => {
      try {
        ProductsModel.deleteOne(productId);
        const productsList = await ProductsModel.find({});
        console.log(productsList);
        socketServer.emit("products", productsList);
      } catch (e) {
        console.log(e);
      }
    });
    socket.on("productModified", async (id, product) => {
      ProductsModel.updateOne(id, product);
      const productsList = await ProductsModel.find({});
      console.log(productsList);
      socketServer.emit("products", productsList);
    });

    socket.on("msg_front_to_back", async (msg) => {
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
