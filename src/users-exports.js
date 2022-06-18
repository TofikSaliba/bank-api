import fs from "fs";
import chalk from "chalk";
import uniqid from "uniqid";
import { loadAccounts, saveAccounts } from "./accounts-exports.js";

export const createAPIKey = () => {
  const newKey = uniqid("", uniqid.process());
  saveUsers([], newKey);
  saveAccounts([], newKey);
  return newKey;
};

export const checkAPIKey = (key) => {
  if (!key) {
    throw new Error("Must provide API key in query!");
  }
  const usersData = loadUsers();
  if (usersData[key] === undefined) {
    return false;
  }
  return true;
};

export const loadUsers = () => {
  try {
    const buffer = fs.readFileSync("src/jasonData/users.json");
    const json = buffer.toString();
    return JSON.parse(json);
  } catch (err) {
    return {};
  }
};

export const saveUsers = (users, key) => {
  const usersData = loadUsers();
  usersData[key] = users;
  const dataJSON = JSON.stringify(usersData);
  fs.writeFileSync("src/jasonData/users.json", dataJSON);
};

export const createUser = (body, key) => {
  if (!body.name || !body.passportID) {
    throw new Error("must provide at least the name and passport ID!");
  }
  const users = loadUsers()[key];
  const dublicate = users.find((user) => {
    return user.passportID === body.passportID;
  });
  if (!dublicate) {
    return makeUserObj(body, users, key);
  } else {
    console.log(chalk.red.inverse("User's passportID is already in use!"));
    throw new Error("User's passportID is already in use!");
  }
};

const makeUserObj = (body, users, key) => {
  const newUserObj = {
    name: body.name,
    passportID: body.passportID,
    cash: 0,
    credit: 0,
    accounts: [],
  };
  users.push(newUserObj);
  saveUsers(users, key);
  console.log(chalk.green.inverse("user added successfully"));
  return newUserObj;
};

export const getUser = (id, key) => {
  if (!id) {
    throw new Error("Must provide a passport ID!");
  }
  const users = loadUsers()[key];
  const user = users.find((user) => {
    return user.passportID === id;
  });
  if (user) {
    return user;
  } else {
    const msg = `User passport ID: ${id} was not found!`;
    console.log(chalk.red.inverse(msg));
    throw new Error(msg);
  }
};

export const updateUsers = (account, key, cash = 0, credit = 0) => {
  const users = loadUsers()[key];
  account.usersAccess.forEach((userID) => {
    const userObj = users.find((user) => {
      return user.passportID === userID;
    });
    userObj.cash += cash;
    userObj.credit += credit;
    if (!userObj.accounts.includes(account.accountID)) {
      userObj.accounts.push(account.accountID);
    }
  });
  saveUsers(users, key);
};

// export const deleteUser = (id) => {
//   const users = loadUsers();
//   const newUsers = users.filter((user) => {
//     return user.id !== id;
//   });
//   if (users.length > newUsers.length) {
//     saveUsers(newUsers);
//     console.log(chalk.green.inverse(`user ID: ${id} was successfully deleted`));
//   } else {
//     console.log(chalk.red.inverse(`user ID: ${id} was not found`));
//   }
// };
