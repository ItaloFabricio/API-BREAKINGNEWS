import { Router } from "express";
import userRouter from "./user.route";
userRouter

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRoute);
router.use('/news', newsRoute);
router.use('/doc', swaggerRoute);

export default router;