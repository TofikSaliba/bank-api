import express from "express";

import { createAPIKey } from "../users-exports.js";

const getAPIKeyRouter = express.Router();

getAPIKeyRouter.use(express.json());
getAPIKeyRouter.use(
  express.urlencoded({
    extended: true,
  })
);

getAPIKeyRouter.get("/api/getAPIKey", function (req, res) {
  const key = createAPIKey();

  res.json({ key });
});

export default getAPIKeyRouter;
