import { Link } from "react-router-dom";

const Header = () => (
  <header className="navbar">
    <nav>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/transactions">Transaction History</Link>
      </div>
    </nav>
  </header>
);

export default Header;
