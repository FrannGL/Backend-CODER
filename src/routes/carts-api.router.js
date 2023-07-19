import express from "express";
export const cartsApiRouter = express.Router();
import { cartsController } from "../controllers/carts.controller.js";

cartsApiRouter.post("/", cartsController.createCart);
cartsApiRouter.post("/:cid/products/:pid", cartsController.createProduct);
cartsApiRouter.get("/", cartsController.read);
cartsApiRouter.get("/:cid", cartsController.readById);
cartsApiRouter.put("/:cid", cartsController.updateCart);
cartsApiRouter.put("/:cid/products/:pid", cartsController.updateProduct);
cartsApiRouter.delete("/:cid", cartsController.deleteCart);
cartsApiRouter.delete("/:cid/products/:pid", cartsController.deleteProduct);
