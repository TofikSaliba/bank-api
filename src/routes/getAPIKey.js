import express from "express";

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
    if (!req.body.mail) {
      throw new Error("Error! missing params.. must provide email!");
    } else if (true) {
    }
    res.json({
      key: `success! Your API key was sent to ${req.body.email}. note: might be in your spam folder`,
    });
  } catch (err) {
    res.status(400).json({
      key: err.message,
    });
  }
  // const key = createAPIKey();
  // res.json({ key });
});

export default getAPIKeyRouter;
