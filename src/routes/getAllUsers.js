import express from "express";

import { loadUsers, checkAPIKey } from "../users-exports.js";

const getAllUsersRouter = express.Router();

getAllUsersRouter.use(express.json());
getAllUsersRouter.use(
  express.urlencoded({
    extended: true,
  })
);

getAllUsersRouter.get("/api/getAllUsers", function (req, res) {
  try {
    if (!checkAPIKey(req.query.apiKey)) {
      res.status(404).json({ code: 404, message: "Wrong API key, Not found!" });
    } else {
      const users = loadUsers()[req.query.apiKey];
      res.json(users);
    }
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
});

export default getAllUsersRouter;
