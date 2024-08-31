import User from "../models/User.js";

const createRepository = (body) => User.create(body);

const findAllRepository = () => User.find();

const findByIdRepository = (id) => User.findById(id);

const updadeRepository = (
  id,
  body
) =>
  User.findOneAndUpdate(
    { _id: id },
    {
      body
    }
  );

export default {
  createRepository,
  findAllRepository,
  findByIdRepository,
  updadeRepository,
};
