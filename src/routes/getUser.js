import express from "express";

import { getUser } from "../users-exports.js";
import { checkAPIKey } from "../api-exports.js";

const getUserRouter = express.Router();

getUserRouter.use(express.json());
getUserRouter.use(
  express.urlencoded({
    extended: true,
  })
);

getUserRouter.get("/api/getUser", function (req, res) {
  try {
    if (!checkAPIKey(req.query.apiKey)) {
      res.status(404).json({ code: 404, message: "Wrong API key, Not found!" });
    } else {
      try {
        res.json(getUser(req.query.userID, req.query.apiKey));
      } catch (err) {
        res.status(404).json({ code: 404, message: err.message });
      }
    }
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
});

export default getUserRouter;
