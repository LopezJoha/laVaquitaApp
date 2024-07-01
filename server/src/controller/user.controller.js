import { UserService } from "../services/user.service.js";
import { StatusCodes } from "http-status-codes";
import userSchema from "../validations/user.schema.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectionPool from "../lib/connection.js";

const UserController = () => {
  const userService = UserService();

  const getById = async (req, res) => {
    console.log(2.1, "[User] Controller Get By Id");

    const user = await userService.getById(req.params.id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `User with id ${req.params.id} does not exist` });
    }

    return res.status(StatusCodes.OK).json({
      user,
    });
  };

  const createUser = async (req, res) => {
    const { email, password } = req.body;

    const client = await connectionPool.connect();
    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      console.log("El correo electrónico ya está registrado");
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está registrado" });
    }

    try {
      console.log("Controller");
      const { error, value } = userSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          messages: error.details.map((detail) => detail.message),
        });
      }
      const sanitizedBody = {
        name: value.name,
        email: value.email,
        password: await bcrypt.hash(value.password, 10),
      };

      const usuario = await userService.createUser(sanitizedBody);
      let token;
      const isUsuarioEmpty = (obj) => Object.keys(obj).length === 0;

      if (!isUsuarioEmpty(usuario)) {
        const payload = { id: usuario.email };
        token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1hr",
        });
      }

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const getByEmail = async (req, res) => {
    console.log(2.2, "[User] Controller Get By Email");

    const user = await userService.getByEmail(req.params.email);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `User with email ${req.params.email} does not exist`,
      });
    }

    return res.status(StatusCodes.OK).json({
      user,
    });
  };

  return {
    getById,
    createUser,
    getByEmail,
  };
};

export { UserController };
