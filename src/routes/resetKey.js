import express from "express";

import { resetKey, checkAPIKey } from "../users-exports.js";

const resetKeyRouter = express.Router();

resetKeyRouter.use(express.json());
resetKeyRouter.use(
  express.urlencoded({
    extended: true,
  })
);

resetKeyRouter.put("/api/resetKey", function (req, res) {
  try {
    if (!checkAPIKey(req.query.apiKey)) {
      res.status(404).json({ code: 404, message: "Wrong API key, Not found!" });
    } else {
      resetKey(req.query.apiKey);
      res.json({
        message: `API Key: ${req.query.apiKey} that was provided is successfully resetted!`,
      });
    }
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
});

export default resetKeyRouter;
