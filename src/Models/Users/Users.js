import Parse from "parse";

// const url =
//   "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

// this function pulls data from the JSON file and returns the response
export const getAllUsers = () => {
  const Users = Parse.Object.extend("Users");
  const query = new Parse.Query(Users);

  return query.find().then((results) => {
    return results;
  });
};

//Made this model before considering auth, so this model will be integrated into the Parse User model in feature 4
