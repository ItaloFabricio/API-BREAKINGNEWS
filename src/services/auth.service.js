import User from "../models/User.js";
import jwt from "jsonwebtoken";

const loginService = (email) =>
  User.findOne({ email: email }).select("+password");

//token para guardar a seção do usuário e o sistema saber qual o usuário está nessa seção sem expor os dados
const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400});

export { loginService, generateToken };
