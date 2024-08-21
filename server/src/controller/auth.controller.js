import { UserService } from "../services/user.service.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthController = () => {

  const userService = UserService();

  const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.getByCredentials(email, password);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials Auth Controller" });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(StatusCodes.OK).json({ token : token, userId: user.id });
  };

  const logout = async (req, res) => {

  };

  return {
    login,
    logout,
  };
};

export { AuthController };
