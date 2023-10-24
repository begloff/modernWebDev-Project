import { useState } from "react";

const NewTransactionModal = ({ isOpen, closeModal }) => {
  // read conditional isOpen. return modal html if true, null if false
  const [transactionForm, setFormData] = useState({
    date: "",
    type: "Expense",
    store: "",
    description: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...transactionForm,
      [name]: value,
    });
  };

  if (!isOpen) {
    return null;
  }

  //As a conditional component, need props to control whether or not it is displayed
  //Map displays all transaction fields
  //Can be updated to look better in the future

  //Will need to update so that button is only available if form is dirty
  //Use react hook form

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          X
        </span>
        <h2>Transaction Details</h2>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <label htmlFor="dateInput">Date:</label>
            <input
              type="date"
              id="dateInput"
              name="date"
              value={transactionForm.date}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="typeInput">Type:</label>
            <select
              name="type"
              id="typeInput"
              value={transactionForm.type}
              onChange={handleInputChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </li>
          <li>
            <label htmlFor="storeInput">Store:</label>
            <input
              type="text"
              name="store"
              id="storeInput"
              value={transactionForm.store}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="descriptionInput">Description:</label>
            <input
              type="text"
              name="description"
              id="descriptionInput"
              value={transactionForm.description}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="amountInput">Amount:</label>
            <input
              type="number"
              name="amount"
              id="amountInput"
              value={transactionForm.amount}
              onChange={handleInputChange}
            />
          </li>
        </ul>
        <button
          className="btn btn-primary"
          onClick={() => closeModal(transactionForm)}
        >
          Create Entry
        </button>
      </div>
    </div>
  );
};

export default NewTransactionModal;
