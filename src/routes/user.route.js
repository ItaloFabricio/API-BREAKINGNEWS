import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middleware.js";

const userRouter = Router();

userRouter.post("/create", userController.create);
userRouter.get("/", userController.findAll);
userRouter.get("/findById/:id", validId, validUser, userController.FindById);
userRouter.patch("/update/:id", validId, validUser, userController.update);

export default userRouter;
