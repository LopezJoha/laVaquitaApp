import express from "express";
import { AuthController } from "../controller/auth.controller.js";

const AuthRouter = () => {
  const authController = AuthController();
  console.log(1, "[User] Router");

  const registerRoutes = () => {
    const router = express.Router();
    console.log(1.1, "[Auth] Routes Registered");

    router.post("/login", authController.login);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { AuthRouter };
