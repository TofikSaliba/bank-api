import express from "express";

import { checkAPIKey, deleteUser } from "../users-exports.js";

const deleteUserRouter = express.Router();

deleteUserRouter.use(express.json());
deleteUserRouter.use(
  express.urlencoded({
    extended: true,
  })
);

deleteUserRouter.delete("/api/deleteUser", function (req, res) {
  try {
    if (!checkAPIKey(req.query.apiKey)) {
      res.status(404).json({ code: 404, message: "Wrong API key, Not found!" });
    } else {
      if (!req.body.passportID) {
        throw new Error(
          "Missing params! must provide passportID of user to delete."
        );
      }
      deleteUser(req.body.passportID, req.query.apiKey);
      res.json({
        message: `Success! User ID: ${req.body.passportID} is now deleted.`,
      });
    }
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
});

export default deleteUserRouter;
