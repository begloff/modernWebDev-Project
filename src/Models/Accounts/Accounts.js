import Parse from "parse";

// const url =
//   "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

// this function pulls data from the JSON file and returns the response
export const getAllAccounts = () => {
  const Accounts = Parse.Object.extend("Accounts");
  const query = new Parse.Query(Accounts);

  return query.find().then((results) => {
    console.log(results);
    return results;
  });
};
