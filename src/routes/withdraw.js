import express from "express";

const withdrawRouter = express.Router();

withdrawRouter.use(express.json());
withdrawRouter.use(
  express.urlencoded({
    extended: true,
  })
);

withdrawRouter.put("/withdraw", function (req, res) {
  res.json({
    procedure: "withdrawing cash",
    userID: req.body.userID,
    accountID: req.body.accountID,
    amount: req.body.amount,
  });
});

export default withdrawRouter;
