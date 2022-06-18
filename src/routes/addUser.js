import express from "express";

import { createUser } from "../users-exports.js";
import { checkAPIKey } from "../api-exports.js";

const addRouter = express.Router();

addRouter.use(express.json());
addRouter.use(
  express.urlencoded({
    extended: true,
  })
);

addRouter.post("/api/addUser", function (req, res) {
  try {
    if (!checkAPIKey(req.query.apiKey)) {
      res.status(404).json({ code: 404, message: "Wrong API key, Not found!" });
    } else {
      const newUser = createUser(req.body, req.query.apiKey);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
});

export default addRouter;
