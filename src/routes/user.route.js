import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/create", userController.create);

userRouter.use(authMiddleware);
userRouter.get("/", userController.findAll);

userRouter.use(validId);
userRouter.get("/findById/:id?", userController.findById);
userRouter.patch("/update/:id",  userController.update);

export default userRouter;
