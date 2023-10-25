import { React, useEffect, useState } from "react";
import "./Home.css";
import AccountsSelect from "../AccountsSelect/AccountsSelect";
import { getAllAccounts } from "../../Models/Accounts/Accounts";

const Home = () => {
  // return the HTML for everything on the page
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    getAllAccounts().then((results) => {
      setAccounts(results);
    });
  }, []);

  return (
    <div>
      <div className="homepage">
        <header className="header">
          <h1>Financial Manager</h1>
          <p>Efficiently Manage Your Finances</p>
        </header>

        <main className="content">
          <section className="summary">
            <h2>Financial Summary</h2>
            <p>Total expenses this year: $30,000.00</p>
            <p>Total expenses this month: $3,000.00</p>
            <p>Total expenses this week: $300.00</p>
          </section>
        </main>
      </div>

      {accounts && <AccountsSelect accounts={accounts} />}
    </div>
  );
};

export default Home;
