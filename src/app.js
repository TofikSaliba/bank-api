import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import addRouter from "./routes/addUser.js";
import depRouter from "./routes/deposit.js";
import updateCreditRouter from "./routes/updateCredit.js";
import withdrawRouter from "./routes/withdraw.js";
import transferRouter from "./routes/transfer.js";
import getUserRouter from "./routes/getUser.js";
import getAllUsersRouter from "./routes/getAllUsers.js";
import addAccountRouter from "./routes/addAccount.js";
import getAPIKeyRouter from "./routes/getAPIKey.js";
import resetKeyRouter from "./routes/resetKey.js";
import addAcessToAccountRouter from "./routes/grantAccess.js";
import removeAccessToAccountRouter from "./routes/removeAccess.js";
import deleteAccountRouter from "./routes/deleteAccount.js";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "../client/build");

app.use(express.static(publicPath));

app.use(express.json());
app.use(cors());
app.use(
  addRouter,
  depRouter,
  updateCreditRouter,
  withdrawRouter,
  transferRouter,
  getUserRouter,
  getAllUsersRouter,
  addAccountRouter,
  getAPIKeyRouter,
  resetKeyRouter,
  addAcessToAccountRouter,
  removeAccessToAccountRouter,
  deleteAccountRouter
);

// if (process.env.NODE_ENV === "production") {}

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
