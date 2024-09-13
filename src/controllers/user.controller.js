import userRepositories from "../repositories/user.repositories.js";
import userService from "../services/user.service.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  try {
    const token = await userService.createUserService({
      name,
      username,
      email,
      password,
      avatar,
      background,
    });
    res.status(201).send(token);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const findAll = async (req, res) => {
  const users = await userService.findAllService();
   
  if(users.length === 0) {
    return res.status(400).send({ message: "There are no registered users" });
   }

   res.send(users);
};

/* const findById = async (req, res) => {
  const id = req.id;

 const user = await userService.findByIdService(id);

 if(!user) {
  return res.status(400).send({ message: "User not found" })
 }

 res.send(user);
}; */

async function findById(userIdParam, userIdLogged) {
  let idParam;
  if (!userIdParam) {
    userIdParam = userIdLogged;
    idParam = userIdParam;
  } else {
    idParam = userIdParam;
  }
  if (!idParam)
    throw new Error('Send an id in the parameters to search for the user');

  const user = await userService.findByIdService(idParam);

  if (!user) throw new Error('User not found');

  return user;
}

const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name && !username && !email && !avatar && !password && !background) {
    throw new Error("Submit at least one field to update the user");
  }

  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ message: "Invalid ID" });
  }

  const user = await userService.findByIdService(userId);

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  await userService.updateService(
    userId,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  res.send({ message: "User successfully updated!" });
};

export default { create, findAll, findById, update };
