import express from "express";

const getUserRouter = express.Router();

getUserRouter.use(express.json());
getUserRouter.use(
  express.urlencoded({
    extended: true,
  })
);

getUserRouter.get("/getUser", function (req, res) {
  res.json({
    procedure: "getting a user",
    passportID: req.body.passportID,
  });
});

export default getUserRouter;
