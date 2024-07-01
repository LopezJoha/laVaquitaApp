import { UserModel } from "../models/user.model.js";

const UserService = () => {
  console.log(3, "[User] Service");

  const userModel = UserModel();

  const getById = (id) => {
    console.log(3.1, "[User] Service Get By Id");

    return userModel.getById(id);
  };

  const createUser = (newUser) => {
    console.log("Creating at Service");
    return userModel.createUser(newUser);
  };

  const getByEmail = (email) => {
    console.log(3.1, "[User] Service Get By email");

    return userModel.getByEmail(email);
  };

  return {
    getById,
    createUser,
    getByEmail,
  };
};

export { UserService };
