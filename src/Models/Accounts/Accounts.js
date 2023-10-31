import Parse from "parse";
import { getUser } from "../../Components/Auth/AuthService";

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

//Future Work: Create, Update Delete operations for accounts
//Have limited data so not entirely necessary yet
