import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser, logoutUser } from "../Auth/AuthService.js";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      {checkUser() ? (
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/transactions">Transaction History</Link>
          </li>
          <li className="navbar-item" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      ) : (
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/auth/register">Register</Link>
          </li>
          <li className="navbar-item">
            <Link to="/auth/login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
