import express from "express";
export const productsRouter = express.Router();
import { productsController } from "../controllers/products.controller.js";
import checkLogin from "../utils/checkLogin.js";

productsRouter.get("/", checkLogin, productsController.readByRenderUser);
