import express from "express";
import uniqid from "uniqid";

import { createAPIKey, sendEmail } from "../api-exports.js";

const getAPIKeyRouter = express.Router();

getAPIKeyRouter.use(express.json());
getAPIKeyRouter.use(
  express.urlencoded({
    extended: true,
  })
);

getAPIKeyRouter.post("/api/getAPIKey", async function (req, res) {
  try {
    const key = uniqid("", uniqid.process());
    if (!req.body.email) {
      throw new Error("Error! missing params.. must provide email!");
    } else {
      await sendEmail(req.body.email, key);
      createAPIKey(key);

      res.json({
        key: `success! Your API key was sent to ${req.body.email}. note: might be in your spam folder`,
      });
    }
  } catch (err) {
    res.status(400).json({
      key: err.message,
    });
  }
});

export default getAPIKeyRouter;
