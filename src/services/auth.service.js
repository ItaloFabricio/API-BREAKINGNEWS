import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

//token para guardar a seção do usuário e o sistema saber qual o usuário está nessa seção sem expor os dados
export const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400});

export default { loginService, generateToken };
