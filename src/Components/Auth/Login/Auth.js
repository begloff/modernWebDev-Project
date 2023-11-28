import { useNavigate, Link } from "react-router-dom";
import { checkUser, loginUser } from "../Services/AuthService";
// import Button from "@mui/material/Button";
import LogoImage from "../BudgetBuddyLogo.png"
import "./Login.css"
import AuthForm from "../Services/LoginForm";
import React, { useEffect, useState } from "react";



const AuthModule = () => {
  const navigate = useNavigate();

  // redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      navigate("/");
    }
  }, [navigate]);

  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: ""
  });

  // flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (currentUser && add) {
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          navigate("/");
        }
        // TODO: redirect user to main app
        setAdd(false);
      });
    }
  }, [navigate, currentUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);

    setCurrentUser({
      ...currentUser,
      [name]: newValue
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div className="authBackground">
      <div className="title">
        <img className="image" src={LogoImage} alt=""></img>
        <h1>Welcome to BudgetBuddy, your personal finance tool!</h1>
      </div>

      <div className="authBox">
        <AuthForm
          user={currentUser}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
        />


        <Link to="/auth/register" className="link">
          Don't have an account?
        </Link>
      </div>  
    </div>
  );
};

export default AuthModule;
