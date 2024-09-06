import { Router } from "express";
import userRouter from "./user.route.js";
import authRoute from "./auth.route.js";
import newsRoute from "./news.route.js";
import swaggerRoute from "./swagger.route.js";
userRouter

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRoute);
router.use('/news', newsRoute);
router.use('/doc', swaggerRoute);

export default router;

//arquivo para deixar apenas as rotas de cada módulo