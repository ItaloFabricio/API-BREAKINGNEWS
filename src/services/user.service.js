import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";
import userRepositories from "../repositories/user.repositories.js";
import mongoose from "mongoose";

async function createUserService({
  name,
  username,
  email,
  password,
  avatar,
  background,
}) {
  if (!username || !name || !email || !password || !avatar || !background)
    throw new Error('Submit all fields for registration');

  const foundUser = await userRepositories.findByEmailUserRepository(email);

  if (foundUser) throw new Error('User already exists');

  const user = await userRepositories.createUserRepository({
    name,
    username,
    email,
    password,
    avatar,
    background,
  });

  if (!user) throw new Error('Error creating User');

  const token = authService.generateToken(user.id);

  return token;
}

//Function to find all users on the mongoose
async function findAllUserService() {
  const users = await userRepositories.findAllUserRepository();

  if (users.length === 0) throw new Error('There are no registered users');

  return users;
}

//Function to find users by id on the mongoose
async function findUserByIdService(userIdParam, userIdLogged) {
  let idParam;
  if (!userIdParam) {
    userIdParam = userIdLogged;
    idParam = userIdParam;
  } else {
    idParam = userIdParam;
  }
  if (!idParam)
    throw new Error('Send an id in the parameters to search for the user');

  const user = await userRepositories.findByIdUserRepository(idParam);

  if (!user) throw new Error('User not found');

  return user;
}

/* async function updateUserService(
  { name, username, email, password, avatar, background },
  userId,
  userIdLogged,
) {
  if (!name && !username && !email && !password && !avatar && !background)
    throw new Error('Submit at least one field to update the user');

  const user = await userRepositories.findByIdUserRepository(userId);

  if (user._id != userIdLogged) throw new Error('You cannot update this user');

  if (password) password = await bcrypt.hash(password, 10);

  await userRepositories.updateUserRepository(
    userId,
    name,
    username,
    email,
    password,
    avatar,
    background,
  );

  return { message: 'User successfully updated!' };
} */

  const updateUserService = async (reqBody, userId) => {
    if (!reqBody.name && !reqBody.username && !reqBody.email && !reqBody.avatar && !reqBody.password && !reqBody.background) {
      throw new Error("Submit at least one field to update the user");
    }
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid ID");
    }
  
    const user = await userRepositories.findByIdUserRepository(userId);
  
    if (reqBody.password) {
      reqBody.password = await bcrypt.hash(reqBody.password, 10);
    }
  
    if (!user) {
      throw new Error("User not found");
    }
    
    await userRepositories.updateUserRepository(
      userId,
      reqBody.name,
      reqBody.username,
      reqBody.email,
      reqBody.password,
      reqBody.avatar,
      reqBody.background
    );
    
    const data = await userRepositories.findByIdUserRepository(userId);
    delete data.password;
    return data;
  }

export default {
  createUserService,
  findAllUserService,
  findUserByIdService,
  updateUserService,
};
