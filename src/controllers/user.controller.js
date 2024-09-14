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
  try {
    const users = await userService.findAllUserService();
    return res.send(users);
  } catch (e) {
    return res.status(404).send(e.message);
  }
};

/* const findById = async (req, res) => {
  const id = req.id;

 const user = await userService.findByIdService(id);

 if(!user) {
  return res.status(400).send({ message: "User not found" })
 }

 res.send(user);
}; */

async function findById(req, res) {
  try {
    const user = await userService.findUserByIdService(
      req.params.id,
      req.userId,
    );
    return res.send(user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function update(req, res) {
  try {
    const userId = req.params.id;
    const userIdLogged = req.userId;

    const response = await userService.updateUserService(req.body, userId, userIdLogged);
    return res.send(response);
  } catch (e) {
    res.status(400).send(e.message);
  }
}


/* const update = async (req, res) => {
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

  await userService.updateUserService(
    userId,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  res.send({ message: "User successfully updated!" });
}; */

export default { create, findAll, findById, update };
