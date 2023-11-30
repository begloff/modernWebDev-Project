import Parse from "parse";
import { getUser } from "../../Components/Auth/Services/AuthService";

// const url =
//   "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

// this function pulls data from the JSON file and returns the response
export const getAllTransactions = (accountId) => {
  const Transactions = Parse.Object.extend("Transactions");
  const query = new Parse.Query(Transactions);

  if (accountId) {
    var account = {
      __type: "Pointer",
      className: "Accounts",
      objectId: accountId,
    };
    query.equalTo("account", account);
  }

  const User = getUser();
  if (User) {
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

  return [];
};

//Need to make Create, Update Delete Operations

export const createTransaction = (data) => {
  const Transactions = Parse.Object.extend("Transactions");
  const transaction = new Transactions();

  //Get user, and get current account (or pass to spending history)
  const User = getUser();
  var user = {
    __type: "Pointer",
    className: "_User",
    objectId: User.id,
  };

  var account = {
    __type: "Pointer",
    className: "Accounts",
    objectId: data.account,
  };

  data.date = new Date(data.date);
  data.amount = Number(data.amount);
  data.user = user;
  data.account = account;

  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      // Set properties based on your data model
      transaction.set(property, data[property]);
    }
  }

  return transaction.save().then((result) => {
    return result;
  });
};

export const updateTransaction = (objectId, data) => {
  const Transactions = Parse.Object.extend("Transactions");
  const query = new Parse.Query(Transactions);

  if (data.date) {
    data.date = new Date(data.date);
  }

  if (data.amount) {
    data.amount = Number(data.amount);
  }

  var account = {
    __type: "Pointer",
    className: "Accounts",
    objectId: data.account,
  };

  data.account = account;

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

export const deleteTransaction = (objectId) => {
  const Transactions = Parse.Object.extend("Transactions");
  const query = new Parse.Query(Transactions);

  return query.get(objectId).then((transaction) => {
    return transaction.destroy();
  });
};

//Will need to be relatively strict on form to create, and update to comply with parse model
