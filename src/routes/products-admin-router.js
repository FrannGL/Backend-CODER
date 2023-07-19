import express from "express";
export const productsAdminRouter = express.Router();
import { productsController } from "../controllers/products.controller.js";
import { checkAdmin } from "../utils/checkLogin.js";

productsAdminRouter.get("/", checkAdmin, productsController.readByRenderAdmin);
