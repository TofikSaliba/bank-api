import express from "express";

const depRouter = express.Router();

depRouter.use(express.json());
depRouter.use(
  express.urlencoded({
    extended: true,
  })
);

depRouter.put("/deposite", function (req, res) {
  res.json({
    procedure: "depositing",
    accountID: req.body.accountID,
    amount: req.body.amount,
    depositorName: req.body.depositorName,
  });
});

export default depRouter;
