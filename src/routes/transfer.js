import express from "express";

const transferRouter = express.Router();

transferRouter.use(express.json());
transferRouter.use(
  express.urlencoded({
    extended: true,
  })
);

transferRouter.put("/transfer", function (req, res) {
  res.json({
    procedure: "transferring money",
    fromUserID: req.body.fromUserID,
    fromAccountID: req.body.fromAccountID,
    toAccountID: req.body.toAccountID,
    amount: req.body.amount,
  });
});

export default transferRouter;
