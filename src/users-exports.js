import fs from "fs";
import chalk from "chalk";

export const loadUsers = () => {
  try {
    const buffer = fs.readFileSync("src/jasonData/users.json");
    const json = buffer.toString();
    return JSON.parse(json);
  } catch (err) {
    return [];
  }
};

export const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);

  fs.writeFileSync("src/jasonData/users.json", dataJSON);
};

export const createUser = (body) => {
  if (!body.name || !body.passportID) {
    throw new Error("must provide at least the name and passport ID!");
  }
  const users = loadUsers();
  const dublicate = users.find((user) => {
    return user.passportID === body.passportID;
  });
  if (!dublicate) {
    return makeUserObj(body, users);
  } else {
    console.log(chalk.red.inverse("User's passportID is already in use!"));
    throw new Error("User's passportID is already in use!");
  }
};

const makeUserObj = (body, users) => {
  const newUserObj = {
    name: body.name,
    passportID: body.passportID,
    cash: body.cash || 0,
    credit: body.credit || 0,
    accounts: body.accounts || [],
  };
  users.push(newUserObj);
  saveUsers(users);
  console.log(chalk.green.inverse("user added successfully"));
  return newUserObj;
};

export const readUser = (id) => {
  const users = loadUsers();
  const user = users.find((user) => {
    return user.id === id;
  });
  if (user) {
    const userPrint = chalk.inverse(user.id);
    console.log(userPrint + "\n" + user.name + "\n" + user.email);
  } else {
    console.log(chalk.red.inverse(`user ID: ${id} was not found`));
  }
};

export const updateUser = (id, newName, newMail) => {
  if (!newName && !newMail) {
    console.log(chalk.red.inverse(`must at least provide one, name or email`));
    return;
  }
  const users = loadUsers();
  const user = users.find((user) => {
    return user.id === id;
  });
  if (user) {
    if (newName) {
      user.name = newName;
    }
    if (newMail) {
      user.email = newMail;
    }
    saveUsers(users);
  } else {
    console.log(chalk.red.inverse(`user ID: ${id} was not found`));
  }
};

export const deleteUser = (id) => {
  const users = loadUsers();
  const newUsers = users.filter((user) => {
    return user.id !== id;
  });
  if (users.length > newUsers.length) {
    saveUsers(newUsers);
    console.log(chalk.green.inverse(`user ID: ${id} was successfully deleted`));
  } else {
    console.log(chalk.red.inverse(`user ID: ${id} was not found`));
  }
};
