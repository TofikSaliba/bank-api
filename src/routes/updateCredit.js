import express from "express";

const updateCreditRouter = express.Router();

updateCreditRouter.use(express.json());
updateCreditRouter.use(
  express.urlencoded({
    extended: true,
  })
);

updateCreditRouter.put("/updateCredit", function (req, res) {
  res.json({
    procedure: "updating credit",
    accountID: req.body.accountID,
    amount: req.body.amount,
  });
});

export default updateCreditRouter;
