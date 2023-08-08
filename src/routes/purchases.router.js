import express from "express";
export const purchasesRouter = express.Router();
import { purchasesController } from "../controllers/purchases.controller.js";

purchasesRouter.get("/", purchasesController.read);
