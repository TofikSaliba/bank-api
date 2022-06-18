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
    return {};
  }
};

export const saveAccounts = (accounts, key) => {
  const accountsData = loadAccounts();
  accountsData[key] = accounts;
  const dataJSON = JSON.stringify(accountsData);
  fs.writeFileSync("src/jasonData/accounts.json", dataJSON);
};

export const createAccount = (body, key) => {
  if (!body.passportID) {
    throw new Error("must provide user owner passport ID!");
  }
  try {
    getUser(body.passportID, key);
    const accounts = loadAccounts()[key];
    const newAcc = makeAccountObj(body, accounts, key);
    updateUsers(newAcc, key, newAcc.cash, newAcc.credit);
    return newAcc;
  } catch (err) {
    throw new Error(err.message + " Cannot create account");
  }
};

const makeAccountObj = (body, accounts, key) => {
  const newAccountObj = {
    owner: body.passportID,
    accountID: uniqid.process(),
    cash: body.cash || 0,
    credit: body.credit || 0,
    usersAccess: [body.passportID],
    isActive: true,
  };
  accounts.push(newAccountObj);
  saveAccounts(accounts, key);
  console.log(chalk.green.inverse("Account created successfully"));
  return newAccountObj;
};

export const depositOrUpdateCredit = (accountID, amount, newCredit, key) => {
  try {
    const accounts = loadAccounts()[key];
    const account = accounts.find((account) => {
      return account.accountID === accountID;
    });
    if (!account) {
      throw new Error(`Account ID: ${accountID} does not exist!`);
    } else {
      let creditDiff = 0;
      account.cash += amount;
      if (newCredit) {
        creditDiff = newCredit - account.credit;
        account.credit = newCredit;
      }
      updateUsers(account, key, amount, creditDiff);
      saveAccounts(accounts, key);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const withdraw = (passportID, accountID, amount, key) => {
  try {
    const accounts = loadAccounts()[key];
    const account = accounts.find((account) => {
      return account.accountID === accountID;
    });
    if (!account) {
      throw new Error(`Account ID: ${accountID} does not exist!`);
    } else if (!account.usersAccess.includes(passportID)) {
      throw new Error(
        "Unauthorized withdrawal, User ID has no access to this account!"
      );
    } else if (account.credit + account.cash < amount) {
      throw new Error("Insufficient funds! amount not available.");
    } else {
      account.cash += -amount;
      updateUsers(account, key, -amount);
      saveAccounts(accounts, key);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addAcessToAccount = (ownerID, accessID, accountID, key) => {
  try {
    const accounts = loadAccounts()[key];
    const account = accounts.find((account) => {
      return account.accountID === accountID;
    });
    if (!account) {
      throw new Error(`Account ID: ${accountID} does not exist!`);
    } else if (account.owner !== ownerID) {
      throw new Error(
        "Unauthorized, Only owner of the account can grant access to other users to it!"
      );
    } else if (account.usersAccess.includes(accessID)) {
      throw new Error(
        `Passport ID: ${accessID} already has access to the account ${accountID}`
      );
    } else {
      account.usersAccess.push(accessID);
      saveAccounts(accounts, key);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
