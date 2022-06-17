import express from "express";

import { getUser } from "../users-exports.js";

const getUserRouter = express.Router();

getUserRouter.use(express.json());
getUserRouter.use(
  express.urlencoded({
    extended: true,
  })
);

getUserRouter.get("/getUser", function (req, res) {
  try {
    res.json(getUser(req.body.passportID));
  } catch (err) {
    res.status(404).json({ code: 404, message: err.message });
  }
});

export default getUserRouter;
