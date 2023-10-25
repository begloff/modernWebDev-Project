import React from "react";
import { useState, useEffect } from "react";

import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../Models/Transactions/Transactions.js";
import { getAllUsers } from "../../Models/Users/Users.js";
import { getAllAccounts } from "../../Models/Accounts/Accounts.js";
import EditTransactionModal from "../EditTransactionModal/EditTransactionModal.js";
import NewTransactionModal from "../NewTransactionModal/NewTransactionModal.js";
import TableQuery from "../TableQuery/TableQuery.js";
import TransactionTable from "../TransactionTable/TransactionTable.js";

const SpendingHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newTransactionModal, setNewTransactionModal] = useState(false);

  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // pull all transactions from json, set transactions, and filter transactions
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
  const toggleEditTransactionModal = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeEditModal = (transaction, id, post = false) => {
    // TODO: Submit to DB to Update existing entries
    if (post) {
      updateTransaction(id, transaction);
    }
    setSelectedTransaction(null);
  };

  const closeNewModal = (transaction, post = false) => {
    //TODO: Set user and account based on current user
    if (post) {
      createTransaction(transaction);
    }
    setNewTransactionModal(false);
  };

  const toggleNewTransactionModal = (transaction) => {
    setNewTransactionModal(true);
  };

  const updateDeletedTransaction = (transactionId) => {
    // Filter out the deleted transaction
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionId
    );

    setTransactions(updatedTransactions);
  };

  // return the HTML for everything on the page
  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Finance Manager</h1>
          <h3>Transaction History</h3>
          <hr />
          <hr />
          <EditTransactionModal
            isOpen={selectedTransaction !== null}
            closeModal={closeEditModal}
            transaction={selectedTransaction}
          />

          <NewTransactionModal
            isOpen={newTransactionModal}
            closeModal={closeNewModal}
          />

          <TableQuery onQuery={handleQuery} />

          <TransactionTable
            transactions={filteredTransactions}
            toggleEditTransactionModal={toggleEditTransactionModal}
            toggleNewTransactionModal={toggleNewTransactionModal}
            setSelectedTransaction={setSelectedTransaction}
            deleteTransaction={deleteTransaction}
            updateDeletedTransaction={updateDeletedTransaction}
          />
        </div>
      </div>
      {filteredTransactions.length > 0 && (
        <div className="row">
          <div className="col">
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
            <p key={user.id}>{user.attributes.firstname}</p>
          ))}
        </div>
      )}

      {accounts.length > 0 && (
        <div>
          {accounts.map((account) => (
            <p key={account.id}>{account.attributes.accountName}</p>
          ))}
        </div>
      )}
    </div>
  );

  // Child component --> houses many of the components necessary for transaction history
};

export default SpendingHistory;
