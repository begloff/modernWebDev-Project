import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../Models/Transactions/Transactions.js";
import { getAllAccounts } from "../../Models/Accounts/Accounts.js";
import Modal from "../Modal/Modal.js";
import TableQuery from "../TableQuery/TableQuery.js";
import TransactionTable from "../TransactionTable/TransactionTable.js";

const SpendingHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [updateTable, setUpdate] = useState(undefined);

  const [accounts, setAccounts] = useState([]);
  const { accountId } = useParams();

  const [modalForm, setModalFormData] = useState({
    isOpen: false,
    data: {},
    fields: {},
    title: "",
    id: "",
    closeModalFunc: () => {},
  });

  useEffect(() => {
    // pull all transactions from json, set transactions, and filter transactions
    if (accountId) {
      getAllTransactions(accountId).then((transactions) => {
        setTransactions(transactions);
        setFilteredTransactions(transactions);
      });
    } else {
      getAllTransactions(accountId).then((transactions) => {
        setTransactions(transactions);
        setFilteredTransactions(transactions);
      });
    }

    getAllAccounts().then((accounts) => {
      setAccounts(accounts);
    });
  }, [accountId]);

  useEffect(() => {
    // This effect will run whenever transactions or filteredTransactions change
    //Filtered Transactions should only contain the transactions in the current account

    if (accountId) {
      setFilteredTransactions(
        transactions.filter(
          (transaction) =>
            transaction.attributes?.account?.id ??
            transaction.attributes?.account?.objectId === accountId
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
  }, [transactions, accountId]);

  useEffect(() => {
    if (updateTable !== undefined) {
      //loop through forms data and update any transactions that have been changed (id)
      const ind = transactions.findIndex((obj) => obj.id === updateTable.id);
      if (ind !== -1) {
        const updatedTransactions = [...transactions];
        updatedTransactions[ind] = updateTable;
        setTransactions(updatedTransactions);
      } else {
        // Add the new transaction to the list
        setTransactions([...transactions, updateTable]);
      }
    }
    setUpdate(undefined);
  }, [updateTable, transactions]);

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

  const openModal = (
    title,
    fields,
    data,
    setModalFormData,
    id,
    closeModalFunc
  ) => {
    // Set the title, fields, data and isopen of the modal
    setModalFormData({
      title: title,
      fields: fields,
      data: data,
      isOpen: true,
      id: id,
      closeModalFunc: closeModalFunc,
    });
  };

  //Modal toggles are passed to other components to allow for the modal to be opened from other components
  // const toggleEditTransactionModal = (transaction) => {
  //   setSelectedTransaction(transaction);
  // };

  const finishEdit = async (
    transaction = {},
    id = "",
    modalForm = {},
    setModalFormData = {},
    setUpdate = {},
    post = false
  ) => {
    // TODO: Submit to DB to Update existing entries
    if (post) {
      //Trigger wait animation

      const updated = await updateTransaction(id, transaction);

      //Untrigger wait animation

      // Some flag to update the table
      setUpdate(updated);
    }

    setModalFormData({ ...modalForm, isOpen: false });
  };

  const finishNewTransaction = async (
    transaction = {},
    modalForm = {},
    setModalFormData = {},
    setUpdate = {},
    post = false
  ) => {
    if (post) {
      const newTransaction = await createTransaction(transaction);
      setUpdate(newTransaction);
    }

    setModalFormData({ ...modalForm, isOpen: false });
  };

  // const toggleNewTransactionModal = (transaction) => {
  //   setNewTransactionModal(true);
  // };

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

          <TableQuery onQuery={handleQuery} />

          <TransactionTable
            transactions={filteredTransactions}
            openModal={openModal}
            modalForm={modalForm}
            setModalFormData={setModalFormData}
            finishEdit={finishEdit}
            finishNewTransaction={finishNewTransaction}
            deleteTransaction={deleteTransaction}
            updateDeletedTransaction={updateDeletedTransaction}
            account={accounts}
          />

          <Modal
            isOpen={modalForm?.isOpen}
            closeModal={modalForm?.closeModalFunc}
            modalForm={modalForm}
            setUpdate={setUpdate}
            setModalFormData={setModalFormData}
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
    </div>
  );

  // Child component --> houses many of the components necessary for transaction history
};

export default SpendingHistory;
