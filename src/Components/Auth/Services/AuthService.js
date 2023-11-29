import Parse from "parse";

// used in auth register component
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  //Async create user request
  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// used in auth login component
export const loginUser = (currUser) => {
  const user = new Parse.User();

  user.set("password", currUser.password);
  user.set("username", currUser.email);

  return user
    .logIn(user.email, user.password)
    .then((currUserSaved) => {
      return currUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const logoutUser = () => {
  //Used in conjunction with redirection to auth component --> sequential
  const currentUser = Parse.User.current();

  if (currentUser) {
    Parse.User.logOut().then(() => {
      // User has been successfully logged out
    });
  }
};

//Used for route verification
export const checkUser = () => {
  return Parse.User.current()?.authenticated;
};

//Future work: Used to create new account and associate with the appropriate userid
export const getUser = () => {
  return Parse.User?.current();
};
