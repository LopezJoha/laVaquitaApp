import { UserService } from "../services/user.service.js";
import { StatusCodes } from "http-status-codes";
import userSchema from "../validations/user.schema.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectionPool from "../lib/connection.js";
const UserController = () => {
  const userService = UserService();

  const getById = async (req, res) => {
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
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está registrado" });
    }

    try {
      const { error, value } = userSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        return res.status(400).json({
          messages: error.details.map((detail) => detail.message),
        });
      }

      let hashPassword = await bcrypt.hash(value.password, 10);
      const sanitizedBody = {
        name: value.name,
        email: value.email,
        password: hashPassword,
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

  const getByCredentials = async (req, res) => {
    try {
      const user = await userService.getByCredentials(
        req.params.email,
        req.params.password
      );
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Usuario No encontrado",
        });
      }
      return res.status(StatusCodes.OK).json({
        message: "Usuario Autorizado",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  return {
    getById,
    createUser,
    getByEmail,
    getByCredentials,
  };
};

export { UserController };
