import { useState, useEffect } from "react";

const TransactionModal = ({ isOpen, closeModal, transaction }) => {
  // read conditional isOpen. return modal html if true, null if false

  let initialTransactionState = {};

  const [editedTransaction, setTransaction] = useState(initialTransactionState);

  useEffect(() => {
    if (transaction) {
      const initialTransactionState = {
        ...transaction.attributes,
      };
      setTransaction(initialTransactionState);
    }
  }, [transaction]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...editedTransaction,
      [name]: value,
    });
  };

  const prepareDataForUpdate = () => {
    const updatedTransaction = { ...editedTransaction };

    for (const key in transaction.attributes) {
      if (
        transaction.attributes.hasOwnProperty(key) &&
        updatedTransaction.hasOwnProperty(key) &&
        transaction.attributes[key] === updatedTransaction[key]
      ) {
        delete updatedTransaction[key];
      }
    }
    setTransaction(updatedTransaction);
    closeModal(editedTransaction, transaction.id, true);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          X
        </span>
        <h2>Transaction Details</h2>
        <ul style={{ listStyleType: "none" }}>
          {Object.entries(editedTransaction).map(([key, value]) => {
            if (typeof value === "object" && value !== null && key !== "date") {
              // Handle nested objects here if needed, or skip them
              return null; // Skip rendering this value
            }
            if (key === "date") {
              return (
                <li key={key}>
                  <label htmlFor="dateInput">{key}:</label>
                  <input
                    type="date"
                    id="dateInput"
                    name="date"
                    value={value ? value.toISOString().split("T")[0] : ""}
                    onChange={handleInputChange}
                  />
                </li>
              );
            } else if (
              key === "description" ||
              key === "store" ||
              key === "amount"
            ) {
              return (
                <li key={key}>
                  <label htmlFor="{key}Input">{key}:</label>
                  <input
                    type="text"
                    id={`${key}Input`}
                    name={`${key}`}
                    value={value}
                    onChange={handleInputChange}
                  />
                </li>
              );
            } else if (key !== "createdAt" && key !== "updatedAt") {
              return (
                <li key={key}>
                  <b>{key}:</b>
                  {value}
                </li>
              );
            } else {
              return <span></span>;
            }
          })}
        </ul>
        <button className="btn btn-primary" onClick={prepareDataForUpdate}>
          Update Entry
        </button>
      </div>
    </div>
  );
};

export default TransactionModal;
