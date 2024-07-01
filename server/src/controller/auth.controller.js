import { UserService } from "../services/user.service.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthController = () => {
  console.log(2, "[Auth] Controller");

  const userService = UserService();

  const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.getByEmail(email);
    console.log(user);

    //ToDo: Revisar las contraseñas al momento de crearla y al momento de encriptar para comparar

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials Auth Controller" });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(StatusCodes.OK).json({ token });
  };

  return {
    login,
  };
};

export { AuthController };
