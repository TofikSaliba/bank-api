import express from "express";

const getAllUsersRouter = express.Router();

getAllUsersRouter.use(express.json());
getAllUsersRouter.use(
  express.urlencoded({
    extended: true,
  })
);

getAllUsersRouter.get("/getAllUsers", function (req, res) {
  res.json({
    procedure: "getting all users",
    users: ["user1", "user2", "user3", "user4"],
  });
});

export default getAllUsersRouter;
