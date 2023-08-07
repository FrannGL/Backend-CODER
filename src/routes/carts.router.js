import express from "express";
export const cartsRouter = express.Router();
import { cartsController } from "../controllers/carts.controller.js";
import { checkLogin, checkUser } from "../middlewares/main.js";

cartsRouter.get("/:cid", checkLogin, checkUser, cartsController.readByRender);
cartsRouter.post("/:cid/products/:pid", checkLogin, cartsController.addProduct);
cartsRouter.put(
  "/:cid/products/:pid",
  checkLogin,
  cartsController.updateProductQuantity
);
cartsRouter.delete(
  "/:cid/products/:pid",
  checkLogin,
  cartsController.deleteProduct
);
cartsRouter.delete("/:cid", checkLogin, cartsController.emptyCart);
