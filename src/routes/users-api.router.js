import express from "express";
export const usersApiRouter = express.Router();
import { usersController } from "../controllers/users.controller.js";
import { profileUploader } from "../utils/main.js";

usersApiRouter.get("/", usersController.read);
usersApiRouter.get("/basic", usersController.readBasicInfo);
usersApiRouter.put("/:_id", usersController.update);
usersApiRouter.delete("/deleteInactiveUsers", usersController.deleteInactiveUsers);
usersApiRouter.get("/premium/:uid", usersController.premiumSwitch);
usersApiRouter.get("/role/:uid", usersController.rolSwitch);
usersApiRouter.post("/:uid/profile", profileUploader.single("profileImage"), usersController.postDocuments);
usersApiRouter.delete("/:_id", usersController.delete);
