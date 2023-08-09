import express from "express";
export const cartsRouter = express.Router();
import { cartsController } from "../controllers/carts.controller.js";

cartsRouter.get("/:cid", cartsController.readByRender);
cartsRouter.post("/:cid/products/:pid", cartsController.addProduct);
cartsRouter.put("/:cid/products/:pid", cartsController.updateProductQuantity);
cartsRouter.delete("/:cid/products/:pid", cartsController.deleteProduct);
cartsRouter.delete("/:cid", cartsController.emptyCart);
