import express from "express";

import { createUser } from "../users-exports.js";

const addRouter = express.Router();

addRouter.use(express.json());
addRouter.use(
  express.urlencoded({
    extended: true,
  })
);

addRouter.post("/addUser", function (req, res) {
  try {
    const newUser = createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
});

export default addRouter;
