import express from "express";
export const purchasesRouter = express.Router();
import { ticketsController } from "../controllers/tickets.controller.js";

purchasesRouter.get("/", ticketsController.readByRender);
