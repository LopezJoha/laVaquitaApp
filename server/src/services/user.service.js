import { UserModel } from "../models/user.model.js";

const UserService = () => {
  const userModel = UserModel();

  const getById = (id) => {
    return userModel.getById(id);
  };

  const createUser = (newUser) => {
    return userModel.createUser(newUser);
  };

  const getByEmail = (email) => {
    return userModel.getByEmail(email);
  };

  const getByCredentials = async (email, password) => {
    return await userModel.getByCredentials(email, password);
  };

  return {
    getById,
    createUser,
    getByEmail,
    getByCredentials,
  };
};

export { UserService };
