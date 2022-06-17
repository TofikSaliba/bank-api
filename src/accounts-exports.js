import fs from "fs";
import chalk from "chalk";
import uniqid from "uniqid";

import {
  loadUsers,
  saveUsers,
  createUser,
  updateUsers,
  getUser,
} from "./users-exports.js";

export const loadAccounts = () => {
  try {
    const buffer = fs.readFileSync("src/jasonData/accounts.json");
    const json = buffer.toString();
    return JSON.parse(json);
  } catch (err) {
    return [];
  }
};

export const saveAccounts = (accounts) => {
  const dataJSON = JSON.stringify(accounts);
  fs.writeFileSync("src/jasonData/accounts.json", dataJSON);
};

export const createAccount = (body) => {
  if (!body.passportID) {
    throw new Error("must provide user owner passport ID!");
  }
  try {
    getUser(body.passportID);
    const accounts = loadAccounts();
    const newAcc = makeAccountObj(body, accounts);
    updateUsers(newAcc, newAcc.cash, newAcc.credit);
    return newAcc;
  } catch (err) {
    throw new Error(err.message + " Cannot create account");
  }
};

const makeAccountObj = (body, accounts) => {
  const newAccountObj = {
    owner: body.passportID,
    accountID: uniqid(),
    cash: body.cash || 0,
    credit: body.credit || 0,
    usersAccess: [body.passportID],
    isActive: true,
  };
  accounts.push(newAccountObj);
  saveAccounts(accounts);
  console.log(chalk.green.inverse("Account created successfully"));
  return newAccountObj;
};

export const deposit = (body) => {
  try {
    const accounts = loadAccounts();
    const account = accounts.find((account) => {
      return account.accountID === body.accountID;
    });
    if (!account) {
      throw new Error("Account ID does not exist!");
    } else {
      account.cash += body.amount;
      updateUsers(account, body.amount);
      saveAccounts(accounts);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
