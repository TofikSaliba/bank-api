import express from "express";

import { deposit } from "../accounts-exports.js";

const depRouter = express.Router();

depRouter.use(express.json());
depRouter.use(
  express.urlencoded({
    extended: true,
  })
);

depRouter.put("/deposit", function (req, res) {
  if (!req.body.amount || !req.body.accountID) {
    res.status(400).json({
      code: 400,
      message: "Missing params! must provide accountID and amount to deposit.",
    });
  }
  try {
    deposit(req.body);
    res.json({
      message: "Success!",
      amount: req.body.amount,
      toAccountID: req.body.accountID,
    });
  } catch (err) {
    res.status(400).json({
      code: 400,
      message: err.message,
    });
  }
});

export default depRouter;
