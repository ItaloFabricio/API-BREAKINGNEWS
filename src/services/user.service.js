import User from "../models/User.js";

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const FindByIdService = (id) => User.findById(id);

const updadeService = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate(
    { _id: id },
    {
      name,
      username,
      email,
      password,
      avatar,
      background,
    }
  );

export default {
  createService,
  findAllService,
  FindByIdService,
  updadeService,
};
