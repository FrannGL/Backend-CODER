import express from "express";
export const productsAdminRouter = express.Router();
import { productsController } from "../controllers/products.controller.js";

productsAdminRouter.get("/", productsController.readByRenderAdmin);
