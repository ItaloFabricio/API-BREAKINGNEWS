import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";
import userRepositories from "../repositories/user.repositories.js";

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

const findAllService = async () => {
  try {
    const users = await userService.findAllRepository();
    if (users.length == 0) {
      throw new Error("There are not registered users");
    }

    return users;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const FindByIdService = async (userIdParam, userIdLogged) => {
  //userIdParam é o ID do usuário que você está procurando, passado como parâmetro.
  //userIdLogged é o ID do usuário atualmente logado.
  try {
    let idParam;
    if (!userIdParam) {
      //se não tiver ID na busca
      userIdParam = userIdLogged; //ele é definido como userIdLogged
      idParam = userIdParam;
    } else {
      idParam = userIdParam;
    }
    if (!idParam)
      throw new Error("Send an id in the parameters to search for the user");

    const user = await userRepositories.findByIdRepository(idParam);

    if (!user) throw new Error("User not found");

    return user;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateService = async (body, userId, userIdLogged) => {
  const { name, username, email, password, avatar, background } = body;
  try {
    if (!name && !username && !email && !password && !avatar && !background) {
      throw new Error("Submit at least one field for update!");
    }

    const user = await userRepositories.findByIdRepository(userId);

    if (user._id != userIdLogged)
      throw new Error("You cannot update this user");

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    await userService.updateService(userId, body);

    return { message: "User successfully update!" };
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default {
  createUserService,
  findAllService,
  FindByIdService,
  updateService,
};
