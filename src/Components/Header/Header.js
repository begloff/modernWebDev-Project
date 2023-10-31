import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../Auth/AuthService.js";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();

  const [logoutFlag, setLogoutFlag] = useState(false);

  useEffect(() => {
    if (logoutFlag) { // Use logoutFlag directly as a boolean
      logoutUser();
      navigate("/auth");
      setLogoutFlag(false);
    }
  }, [logoutFlag, navigate]); // Include logoutFlag as a dependency

  const handleLogout = () => {
    setLogoutFlag(true);
  };

  return (
    <header className="navbar">
      <nav>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/transactions">Transaction History</Link>
          <p to="/auth" onClick={handleLogout}>Logout</p>
        </div>
      </nav>
    </header>
  );
}

export default Header;
