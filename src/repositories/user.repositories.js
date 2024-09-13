import User from "../models/User.js";

const createRepository = (body) => User.create(body);

const findAllRepository = () => User.find();

const findByIdRepository = (id) => User.findById(id);

const updateRepository = (
  userId,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate(
    { _id: userId },
    {
      name,
      username,
      email,
      password,
      avatar,
      background,
    },
    {
      rawResult: true,
    }
  );

export default {
  createRepository,
  findAllRepository,
  findByIdRepository,
  updateRepository,
};
