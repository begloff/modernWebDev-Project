import React, { useEffect, useState } from "react";
import { checkUser, createUser } from "../Services/AuthService";
import AuthForm from "../Services/RegisterForm";
import { useNavigate, Link } from "react-router-dom";
import LogoImage from "../BudgetBuddyLogo.png"

const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  // redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    // checkUser() ? history.push("/home"): null;
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("firstName")}, you successfully registered!`
          );
          navigate("/");
        }
        setAdd(false);
      });
    }
  }, [navigate, newUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;

    // Update user info on change
    setNewUser({
      ...newUser,
      [name]: newValue,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  //Parent Child --> AuthForm handles state

  return (
    <div className="authBackground">
      <img className="imageReg" src={LogoImage} alt=""></img>
      
      <div className="authBoxReg">
        <AuthForm
          user={newUser}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
        />
        <Link to="/auth" className="link">
          Already have an account?
        </Link>
      </div>  
    </div>
  );
};

export default AuthRegister;
