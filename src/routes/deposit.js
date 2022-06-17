import express from "express";

import { deposit } from "../accounts-exports.js";
import { checkAPIKey } from "../users-exports.js";

const depRouter = express.Router();

depRouter.use(express.json());
depRouter.use(
  express.urlencoded({
    extended: true,
  })
);

depRouter.put("/deposit", function (req, res) {
  try {
    if (!checkAPIKey(req.query.apiKey)) {
      res.status(404).json({ code: 404, message: "Wrong API key, Not found!" });
    } else {
      if (!req.body.amount || !req.body.accountID) {
        throw new Error(
          "Missing params! must provide accountID and amount to deposit."
        );
      } else if (req.body.amount < 0) {
        throw new Error("Amount must be a positive number!");
      }
      deposit(req.body, req.query.apiKey);
      res.json({
        message: "Success!",
        amount: req.body.amount,
        toAccountID: req.body.accountID,
      });
    }
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
});

export default depRouter;
