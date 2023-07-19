import express from "express";
export const productsApiRouter = express.Router();
import { productsController } from "../controllers/products.controller.js";

productsApiRouter.post("/", productsController.create);
productsApiRouter.get("/", productsController.read);
productsApiRouter.put("/:_id", productsController.update);
productsApiRouter.delete("/:_id", productsController.delete);
