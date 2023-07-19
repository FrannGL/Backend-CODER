import express from "express";
export const cartsRouter = express.Router();
import { cartsController } from "../controllers/carts.controller.js";
import { checkLogin } from "../middlewares/main.js";

cartsRouter.get("/:cid", checkLogin, cartsController.readByRender);
