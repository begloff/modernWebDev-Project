import { Link } from "react-router-dom";

const Footer = () => (
  <footer>
    <nav>
      <ul>
        <li> 
            <Link to="/">Home</Link> 
        </li>
        <li> 
            <Link to="/SpendingHistory">Spending History</Link> 
        </li>
      </ul>
    </nav>
  </footer>
);

export default Footer;
