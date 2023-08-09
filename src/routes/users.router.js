import express from "express";
export const usersRouter = express.Router();
import { usersController } from "../controllers/users.controller.js";

usersRouter.get("/", usersController.readByrender);
