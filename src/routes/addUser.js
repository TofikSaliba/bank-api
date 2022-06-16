import express from "express";

const addRouter = express.Router();

addRouter.use(express.json());
addRouter.use(
  express.urlencoded({
    extended: true,
  })
);

addRouter.post("/addUser", function (req, res) {
  res.json({
    procedure: "adding a user",
    name: req.body.name,
    passportID: req.body.passportID,
    cash: req.body.cash || 0,
    credit: req.body.credit || 0,
    accounts: req.body.accounts || [],
  });
});

export default addRouter;
