import {
  createService,
  findAllService,
  countNews,
} from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !banner || !text) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  let { limit, offset } = req.query;

  limit = Number(limit);
  offset = Number(offset); //quantos itens eu vou pulando

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const news = await findAllService(offset, limit);
  const total = await countNews();
  const currentUrl = req.baseUrl;
  console.log(total);

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  if (news.length == 0) {
    return res.status(400).send({ message: "There are not registered news" });
  }

  res.send({
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: news.map(newsItem => ({
      id: newsItem._id,
      title: newsItem.title,
      text: newsItem.text,
      banner: newsItem.banner,
      likes: newsItem.likes,
      comments: newsItem.comments,
      name: newsItem.user.name,
      userName: newsItem.user.userName,
      userAvatar: newsItem.user.avatar
    }))
  });
};

export { create, findAll };
