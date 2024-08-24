import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  erase
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validNews } from "../middlewares/global.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.patch("/:id", authMiddleware, validNews, update);
router.delete("/:id", authMiddleware, validNews, erase);

router.get("/:id", authMiddleware, findById);

export default router;
