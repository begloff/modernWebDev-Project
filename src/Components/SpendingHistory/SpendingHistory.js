import React from "react";
import { useState, useEffect } from "react";

import { getAllTransactions } from "../../Models/Transactions/Transactions.js";
import { getAllUsers } from "../../Models/Users/Users.js";
import { getAllAccounts } from "../../Models/Accounts/Accounts.js";
import TransactionModal from "../TransactionModal/TransactionModal.js";
import TableQuery from "../TableQuery/TableQuery.js";
import TransactionTable from "../TransactionTable/TransactionTable.js";

const SpendingHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // pull all transactions from json, set transactions, and filter transactions
    console.log("fetching");
    getAllTransactions().then((transactions) => {
      setTransactions(transactions);
      setFilteredTransactions(transactions);
    });

    getAllAccounts().then((accounts) => {
      setAccounts(accounts);
    });

    getAllUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleQuery = (searchParams) => {
    //Controls data displayed in table, will need to be updated to include other fields

    if (searchParams === "") {
      setFilteredTransactions(transactions);
      return;
    }

    // filter transactions based on input
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.attributes.description
        .toLowerCase()
        .includes(searchParams.toLowerCase())
    );
    setFilteredTransactions(filteredTransactions);
  };

  //Modal toggles are passed to other components to allow for the modal to be opened from other components
  const toggleTransactionModal = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  // return the HTML for everything on the page
  return (
    <div>
      <div class="row">
        <div class="col">
          <h1>Finance Manager</h1>
          <h3>Transaction History</h3>
          <hr />
          <hr />
          <TransactionModal
            isOpen={selectedTransaction !== null}
            closeModal={closeModal}
            transaction={selectedTransaction}
          />

          <TableQuery onQuery={handleQuery} />

          <TransactionTable
            transactions={filteredTransactions}
            toggleTransactionModal={toggleTransactionModal}
            setSelectedTransaction={setSelectedTransaction}
          />
        </div>
      </div>
      {filteredTransactions.length > 0 && (
        <div class="row">
          <div class="col">
            <h3>
              {" "}
              Total Spent: $
              {filteredTransactions
                .reduce(
                  (total, transaction) =>
                    total + Number(transaction.attributes.amount),
                  0
                )
                .toFixed(2)}
            </h3>
          </div>
        </div>
      )}

      {users.length > 0 && (
        <div>
          {users.map((user) => (
            <p>{user.attributes.firstname}</p>
          ))}
        </div>
      )}

      {accounts.length > 0 && (
        <div>
          {accounts.map((account) => (
            <p>{account.attributes.accountName}</p>
          ))}
        </div>
      )}
    </div>
  );

  // The reduce is a bit messy, can put in function in future
};

export default SpendingHistory;
