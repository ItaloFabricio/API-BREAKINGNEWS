import News from "../models/News.js";

export const createService = (body) => News.create(body);

export const findAllService = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countNews = () => News.countDocuments();

export const topNewsService = () =>
  News.findOne().sort({ _id: -1 }).populate("user");

export const findByIdService = (id) => News.findById(id).populate("user");

export const searchByTitleService = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

export const byUserService = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");

export const updateService = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    {
      rawResult: true,
    }
  );

export const eraseService = (id) => News.findOneAndDelete({ _id: id });

export const likeNewsService = (idNews, userId) =>
  News.findOneAndUpdate(
    //faço um filtro dentro da minha collection de News no id da news que eu mandei(idNews)
    //outro filtro no "likes.userId", procura nesse Array o userId e compara se é o mesmo que enviei ?
    //se for o mesmo, não da like.
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    //se não for, faz o push para dar like
    { $push: { likes: { userId, created: new Date() } } }
    //a função $push adiciona um item no array, é uma query
    //faz o push no campo likes
    //o push vai ter um objeto: o id do usuario (userId) que fez o post
    //cria a data que ele foi criado
  );

export const deleteLikeNewsService = (idNews, userId) =>
  News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

export const addCommentService = (idNews, comment, userId) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);

  //busca pelo _id da noticia (idNews)
  //adiciona(push) em comments
  //em cada comentarios coloca o id do comment(idComment), id do usuario que fez o comentario(userId),
  // o próprio comentário(comment) e a data (createdAt)
  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comments: { idComment, userId, comment, createdAt: new Date() },
      },
    }
  );
};

export const deleteCommentService = (idNews, idComment, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, userId } } }
  );
