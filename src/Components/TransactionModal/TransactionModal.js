const TransactionModal = ({ isOpen, closeModal, transaction }) => {
  // read conditional isOpen. return modal html if true, null if false
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
          {Object.entries(transaction.attributes).map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
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
                    name="dateInput"
                    defaultValue={value.toISOString().split("T")[0]}
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
                    name={`${key}Input`}
                    defaultValue={value}
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
        <button className="btn btn-primary" onClick={closeModal}>
          Update Entry
        </button>
      </div>
    </div>
  );
};

export default TransactionModal;
