import express from "express";
import { AuthController } from "../controller/auth.controller.js";

const AuthRouter = () => {
  const authController = AuthController();

  const registerRoutes = () => {
    const router = express.Router();

    router.post("/login", authController.login);
    router.post("/logout", authController.logout);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { AuthRouter };
