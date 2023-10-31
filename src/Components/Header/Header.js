import { Link } from "react-router-dom";
import { logoutUser } from "../Auth/AuthService.js";

function Header() {

  return (
    <header className="navbar">
      <nav>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/transactions">Transaction History</Link>
          <Link to="/auth" onClick={logoutUser}>Logout</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
