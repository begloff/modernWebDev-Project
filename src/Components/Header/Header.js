// Header.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser, logoutUser } from "../Auth/Services/AuthService.js";
import logo from "../Auth/BudgetBuddyLogo.png";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logoutUser();
      navigate("/auth");
    }
  };

  return (
    checkUser() && (
      <div>
        <nav className="navbar">
          <img src={logo} alt="Budget Buddy Logo" className="logo" />
            <Link to="/" className="navbarItem">
              Home
            </Link>
            <Link to="/transactions" className="navbarItem">
              Transaction History
            </Link>
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
        </nav>
        <hr></hr>
      </div>
    )
  );
};

export default Header;
