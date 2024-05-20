import express from "express";
import { UserController } from "../controller/user.controller.js";

const UserRouter = () => {
  const userController = UserController();

  const registerRoutes = () => {
    const router = express.Router();
   

    router.post("/", UserController.createUser);

    

    return router;
  };
  return {
    registerRoutes,
  };
};
export { UserRouter };
