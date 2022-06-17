import express from "express";

import { createAccount } from "../accounts-exports.js";

const addAccountRouter = express.Router();

addAccountRouter.use(express.json());
addAccountRouter.use(
  express.urlencoded({
    extended: true,
  })
);

addAccountRouter.post("/addAccount", function (req, res) {
  try {
    const newAccount = createAccount(req.body);
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }
});

export default addAccountRouter;
