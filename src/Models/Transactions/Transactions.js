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

//Will need to be relatively strict on form to create, and update to comply with parse model
