import User from '../models/User.js';

//To find a user by email
const findByEmailUserRepository = (email) => User.findOne({ email: email });

//To create a new user
const createUserRepository = ({
  name,
  username,
  email,
  password,
  avatar,
  background,
}) =>
  User.create({
    name,
    username,
    email,
    password,
    avatar,
    background,
  });

//To find all users
const findAllUserRepository = () => User.find();

//To find a user by ID
const findByIdUserRepository = (idUser) => User.findById(idUser);

//To update a user by ID
const updateUserRepository = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background,
) =>
  User.findOneAndUpdate(
    {
      _id: id,
    },
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
    },
  );

export default {
  findByEmailUserRepository,
  createUserRepository,
  findAllUserRepository,
  findByIdUserRepository,
  updateUserRepository,
};
