import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser, logoutUser } from "../Auth/Services/AuthService.js";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/auth");
  };

  return (
    checkUser() && (
      <div>
        <nav className="navbar">
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
        </nav>
      </div>
    )
  );
};

export default Header;
