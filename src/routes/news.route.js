import { Router } from "express";
const router = Router();

import { create, findAll } from "../controllers/news.controller.js";

router.post("/", create);
router.get("/", getAll);

export default router;