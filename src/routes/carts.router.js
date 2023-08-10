import express from "express";
export const cartsRouter = express.Router();
import { cartsController } from "../controllers/carts.controller.js";
import { checkCart, checkUser } from "../middlewares/main.js";

cartsRouter.get("/:cid", checkCart, cartsController.readByRender);
cartsRouter.post("/:cid/products/:pid", checkCart, checkUser, cartsController.addProduct);
cartsRouter.put("/:cid/products/:pid", cartsController.updateProductQuantity);
cartsRouter.delete("/:cid/products/:pid", cartsController.deleteProduct);
cartsRouter.delete("/:cid", cartsController.emptyCart);
