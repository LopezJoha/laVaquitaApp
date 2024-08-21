import express from "express";
import { UserController } from "../controller/user.controller.js";

const UserRouter = () => {
  const userController = UserController();

  const registerRoutes = () => {
    const router = express.Router();

    //router.get("/", userController.getAll);
    router.get("/:id", userController.getById);
    router.get("/:email", userController.getByEmail);
    router.post("/", userController.createUser);

    return router;
  };

  return {
    registerRoutes,
  };
};

export { UserRouter };
