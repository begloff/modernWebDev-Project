import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./TransactionTable.css";

const TransactionTable = ({
  transactions,
  setTransactions,
  accounts,
  openModal,
  modalForm,
  setModalFormData,
  finishEdit,
  finishNewTransaction,
  deleteTransaction,
  updateDeletedTransaction,
  account,
}) => {
  // Table displays all transaction fields - alternating color based on css
  const formFields = [
    {
      name: "date",
      type: "date",
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          name: "Expense",
          value: "expense",
        },
        {
          name: "Income",
          value: "income",
        },
      ],
    },
    {
      name: "store",
      type: "text",
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "amount",
      type: "number",
    },
    {
      name: "account",
      type: "select",
      options: accounts.map((item) => {
        return {
          name: item.attributes.accountName,
          value: item.id,
        };
      }),
    },
  ];

  const [sortOrder, setSortOrder] = useState({ dateSort: false });

  //Update transactions based on which column is clicked

  const handleSort = (columnName) => {
    const propertyName = `${columnName}Sort`;

    if (propertyName in sortOrder) {
      setSortOrder({
        [propertyName]: !sortOrder[propertyName],
      });
    } else {
      setSortOrder({
        [propertyName]: true,
      });
    }

    // Sort by column name and sort order propertyname
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (columnName === "store" || columnName === "description") {
        if (
          a.attributes[columnName].toLowerCase() <
          b.attributes[columnName].toLowerCase()
        ) {
          return -1;
        } else if (
          a.attributes[columnName].toLowerCase() >
          b.attributes[columnName].toLowerCase()
        ) {
          return 1;
        } else {
          return 0;
        }
      }

      if (a.attributes[columnName] < b.attributes[columnName]) {
        return -1;
      } else if (a.attributes[columnName] > b.attributes[columnName]) {
        return 1;
      } else {
        return 0;
      }
    });

    if (sortOrder[propertyName]) {
      sortedTransactions.reverse();
    }

    setTransactions(sortedTransactions);
  };

  return (
    <div className="row" style={{ marginTop: "25px" }}>
      <div className="col">
        <div className="table-container" style={{ marginBottom: "25px" }}>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                {/* make header interactive, sort on click */}
                <th
                  onClick={() => handleSort("date")}
                  style={{ cursor: "pointer" }}
                >
                  Date
                  {"dateSort" in sortOrder && (
                    <span className="arrow">
                      {`${sortOrder["dateSort"] ? "\u25B2" : "\u25BC"}`}
                    </span>
                  )}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("description")}
                >
                  Description
                  {"descriptionSort" in sortOrder && (
                    <span className="arrow">
                      {`${sortOrder["descriptionSort"] ? "\u25B2" : "\u25BC"}`}
                    </span>
                  )}
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("amount")}
                >
                  Amount
                  {"amountSort" in sortOrder && (
                    <span className="arrow">
                      {`${sortOrder["amountSort"] ? "\u25B2" : "\u25BC"}`}
                    </span>
                  )}
                </th>
                <th
                  onClick={() => handleSort("store")}
                  style={{ cursor: "pointer" }}
                >
                  Store
                  {"storeSort" in sortOrder && (
                    <span className="arrow">
                      {`${sortOrder["storeSort"] ? "\u25B2" : "\u25BC"}`}
                    </span>
                  )}
                </th>

                <th style={{ textAlign: "center" }}>X</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  className={
                    transaction.attributes.type === "expense"
                      ? "red-row"
                      : "black-row"
                  } // Apply red or black class based on the transaction type
                  style={{ cursor: "pointer" }}
                  key={transaction.id}
                  onClick={() => {
                    openModal(
                      "Edit Transaction",
                      formFields,
                      {
                        date: transaction.attributes.date
                          .toISOString()
                          .split("T")[0],
                        type: transaction.attributes.type,
                        store: transaction.attributes.store,
                        description: transaction.attributes.description,
                        amount: transaction.attributes.amount,
                        account: transaction.attributes.account.id,
                      },
                      setModalFormData,
                      transaction.id,
                      finishEdit
                    );
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{transaction.attributes.date.toDateString()}</td>
                  <td>{transaction.attributes.description}</td>
                  <td>
                    $
                    {transaction.attributes.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>{transaction.attributes.store}</td>
                  <td
                    className="dropCol"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTransaction(transaction.id);
                      updateDeletedTransaction(transaction.id);
                    }}
                    style={{ textAlign: "center" }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-primary"
          style={{ marginBottom: "15px" }}
          onClick={() => {
            openModal(
              "Create Transaction",
              formFields,
              {
                date: "",
                type: "",
                store: "",
                description: "",
                amount: "",
                account: account ?? "",
              },
              setModalFormData,
              undefined,
              finishNewTransaction
            );
          }}
          disabled={accounts.length === 0}
        >
          Add New Transaction
        </button>
        <hr />
        <hr />
      </div>
    </div>
  );
};

export default TransactionTable;
