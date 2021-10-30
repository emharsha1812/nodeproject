import express from "express";

import {
  createUser,
  deleteUser,
  getUser,
  getUserID,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUser);

router.post("/users", createUser);

router.get("/users/:id", getUserID);

router.delete("/users/:id", deleteUser);

router.patch("/users/:id", updateUser);

export default router;

//browsers can only send get requests
