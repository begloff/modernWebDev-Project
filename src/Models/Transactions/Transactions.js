import Parse from "parse";

// const url =
//   "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

// this function pulls data from the JSON file and returns the response
export const getAllTransactions = () => {
  const Transactions = Parse.Object.extend("Transactions");
  const query = new Parse.Query(Transactions);

  return query.find().then((results) => {
    return results;
  });
};

//Need to make Create, Update Delete Operations

export const createTransaction = (data) => {
  const Transactions = Parse.Object.extend("Transactions");
  const transaction = new Transactions();

  data.date = new Date(data.date);
  data.amount = Number(data.amount);

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
