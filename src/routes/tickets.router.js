import express from "express";
export const apiTickets = express.Router();
import { ticketsController } from "../controllers/tickets.controller.js";

apiTickets.get("/:tid", ticketsController.read);
apiTickets.get("/purchases", ticketsController.readByRender);
apiTickets.post("/:cid/purchase", ticketsController.create);
