import express from "express";

import { loadUsers } from "../users-exports.js";

const getAllDataRouter = express.Router();

getAllDataRouter.use(express.json());
getAllDataRouter.use(
  express.urlencoded({
    extended: true,
  })
);

getAllDataRouter.get("/api/getAllData", function (req, res) {
  try {
    const data = loadUsers();

    res.json(data);
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
});

export default getAllDataRouter;
