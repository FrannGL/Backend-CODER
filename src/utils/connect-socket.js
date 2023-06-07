import { Server } from "socket.io";
import { MsgModel } from "../DAO/models/msgs.model.js";

export function connectSocketServer(httpServer) {
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

    socket.on("deleteProduct", async (productId) => {
      prodMan.deleteProduct(productId);
      const productsList = await prodMan.getProducts();
      console.log(productsList);
      socketServer.emit("products", productsList);
    });
    socket.on("productModified", async (id, product) => {
      prodMan.updateProduct(id, product);
      const productsList = await prodMan.getProducts();
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
