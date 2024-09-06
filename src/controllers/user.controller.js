import userService from "../services/user.service.js";

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
    const users = await userService.findAllService();
    return res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const FindById = async (req, res) => {
  const {id: userId} = req.params;
  const userIdLogged = req.userId;

  try {
    const user = await userService.FindByIdService(userId, userIdLogged);
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  const body = req.body;
  const userId = req.userId;
  try {
    const response = await userService.updateService(
      body, userId
    );

    res.send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, FindById, update };
