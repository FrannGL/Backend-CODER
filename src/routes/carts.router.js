import express from "express";
export const cartsRouter = express.Router();
import { cartsController } from "../controllers/carts.controller.js";

cartsRouter.get("/:cid", cartsController.readByRender);
