import express from "express";
import { GroupController } from "../controller/groups.controller.js";

const GroupRouter = () => {
  const groupController = GroupController();

  const registerRoutes = () => {
    const router = express.Router();
    router.get("/", groupController.getGroups);

    router.get("/:id", groupController.getGroupById);

    router.post("/", groupController.createGroup);

    //router.put("/group/:id", groupController.updateGroup);

    //router.delete("/group/:id");

    return router;
  };
  return {
    registerRoutes,
  };
};
export { GroupRouter };
