import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";
import userRepositories from "../repositories/user.repositories.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const createUserService = async (body) => {
  const { name, username, email, password, avatar, background } = body;

  if (!name || !username || !email || !password || !avatar || !background) {
    throw new Error("Submit all fields for registration!");
  }

  const newUser = {
    name,
    username,
    email,
    password,
    avatar,
    background,
  };

  const user = await userRepositories.createRepository(newUser);

  if (!user) {
    throw new Error("Error creating User");
  }

  const token = authService.generateToken(user.id);

  return {
    message: "User created sucessfully",
    /* user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background,
      }, */
    token,
  };
};

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
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
  createUserService,
  findAllService,
  findByIdService,
  updateService,
};
