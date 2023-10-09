import Parse from "parse";

// const url =
//   "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

// this function pulls data from the JSON file and returns the response
export const getAllUsers = () => {
  const Users = Parse.Object.extend("Users");
  const query = new Parse.Query(Users);

  return query.find().then((results) => {
    console.log(results);
    return results;
  });
};
