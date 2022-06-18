import express from "express";

import { getUser, checkAPIKey } from "../users-exports.js";

const getUserRouter = express.Router();

getUserRouter.use(express.json());
getUserRouter.use(
  express.urlencoded({
    extended: true,
  })
);

getUserRouter.get("/api/getUser", function (req, res) {
  console.log(req.params, req.query);
  try {
    if (!checkAPIKey(req.query.apiKey)) {
      res.status(404).json({ code: 404, message: "Wrong API key, Not found!" });
    } else {
      try {
        res.json(getUser(req.query.id, req.query.apiKey));
      } catch (err) {
        res.status(404).json({ code: 404, message: err.message });
      }
    }
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
});

export default getUserRouter;
