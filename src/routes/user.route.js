import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middleware.js";

const userRouter = Router();

userRouter.post("/", userController.create);
userRouter.get("/", userController.findAll);
userRouter.get("/:id", validId, validUser, userController.FindById);
userRouter.patch("/:id", validId, validUser, userController.update);

export default userRouter;
