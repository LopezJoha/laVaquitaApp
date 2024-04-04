import express from "express";
import {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} from "../controller/groups.controller.js";

const router = express.Router();

router.get("/groups", getGroups);

router.get("/group/:id", getGroup);

router.post("/group", createGroup);

router.put("/group/:id", updateGroup);

router.delete("/group/:id");

export default router;
