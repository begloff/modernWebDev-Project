import Parse from "parse";
import { getUser } from "../../Components/Auth/Services/AuthService";
import {
  getAllTransactions,
  deleteTransaction,
} from "../Transactions/Transactions";

// const url =
//   "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

// this function pulls data from the JSON file and returns the response
export const getAllAccounts = () => {
  const User = getUser();

  if (User) {
    const Accounts = Parse.Object.extend("Accounts");
    const query = new Parse.Query(Accounts);

    var user = {
      __type: "Pointer",
      className: "_User",
      objectId: User.id,
    };

    query.equalTo("user", user);

    return query.find().then((results) => {
      return results;
    });
  }

  return {};
};

export const updateAccount = (objectId, data) => {
  const Accounts = Parse.Object.extend("Accounts");
  const query = new Parse.Query(Accounts);

  return query.get(objectId).then((transaction) => {
    // Update properties based on your data model
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        // Set properties based on your data model
        transaction.set(property, data[property]);
      }
    }
    return transaction.save().then((result) => {
      return result;
    });
  });
};

export const updateAccountBalance = (objectId, amount) => {
  const Accounts = Parse.Object.extend("Accounts");
  const query = new Parse.Query(Accounts);

  return query.get(objectId).then((transaction) => {
    // Update properties based on your data model
    transaction.set("balance", amount);

    return transaction.save().then((result) => {
      return result;
    });
  });
};

export const createAccount = (data) => {
  const Accounts = Parse.Object.extend("Accounts");
  const account = new Accounts();

  //Get user, and get current account (or pass to spending history)
  const User = getUser();
  var user = {
    __type: "Pointer",
    className: "_User",
    objectId: User.id,
  };

  data.balance = Number(0);

  data.user = user;

  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      // Set properties based on your data model
      account.set(property, data[property]);
    }
  }

  return account.save().then((result) => {
    return result;
  });
};

export const deleteAccount = (objectId) => {
  const Accounts = Parse.Object.extend("Accounts");
  const query = new Parse.Query(Accounts);

  //Scan through all transactions within this account and delete them
  getAllTransactions(objectId).then((transactions) => {
    transactions.forEach((transaction) => {
      deleteTransaction(transaction.id);
    });
  });

  return query.get(objectId).then((transaction) => {
    return transaction.destroy();
  });
};

//Future Work: Create, Update Delete operations for accounts
//Have limited data so not entirely necessary yet
