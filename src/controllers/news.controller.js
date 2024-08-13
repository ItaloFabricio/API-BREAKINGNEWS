import { createService, findAllService } from "../services/news.service.js";
import { ObjectId } from "mongoose";

const create = async (req, res) => {
  try {

    const { title, text, banner } = req.body;

    if(!title || !banner || !text) {
        res.status(400).send({
            message: "Submit all fields for registration"
        });
    }

    await createService({
        title,
        text,
        banner,
        user: {_id:"66aff379f167fb530eeb785d"},
    })

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  const news = await findAllService();

  if (news.length == 0) {
    return res.status(400).send({ message: "There are not registered news" });
  }

  res.send(news);
};

export { create, findAll };
