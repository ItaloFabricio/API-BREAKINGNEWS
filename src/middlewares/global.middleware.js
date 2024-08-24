import mongoose from "mongoose";
import userService from "../services/user.service.js";
import { findByIdService } from "../services/news.service.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await userService.FindByIdService(id);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validNews = async (req, res, next) => {
  try{
    const { id } = req.params;

    const news = await findByIdService(id);

    if (!news) {
      return res.status(404).send({ message: "News not found" });
    }

    req.news = news;
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export default { validId, validUser, validNews };
