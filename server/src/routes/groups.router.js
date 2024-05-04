import express from "express";
import { GroupController } from "../controller/groups.controller.js";

const GroupRouter = () => {
  const groupController = GroupController();

  const registerRoutes = () => {
    const router = express.Router();
    router.get("/", groupController.getGroups);

    router.get("/:id", groupController.getById);

    router.post("/", groupController.createGroup);

    router.put("/:id", groupController.updateGroup);

    router.delete("/:id", groupController.deleteGroup);

    return router;
  };
  return {
    registerRoutes,
  };
};
export { GroupRouter };
