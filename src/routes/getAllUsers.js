import express from "express";

import { loadUsers } from "../users-exports.js";

const getAllUsersRouter = express.Router();

getAllUsersRouter.use(express.json());
getAllUsersRouter.use(
  express.urlencoded({
    extended: true,
  })
);

getAllUsersRouter.get("/getAllUsers", function (req, res) {
  res.json(loadUsers());
});

export default getAllUsersRouter;
