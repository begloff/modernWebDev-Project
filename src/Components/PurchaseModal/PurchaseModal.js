const PurchaseModal = ({ isOpen, closeModal, purchase }) => {
  // read conditional isOpen. return modal html if true, null if false
  if (!isOpen) {
    return null;
  }

  //As a conditional component, need props to control whether or not it is displayed
  //Map displays all purchase fields
  //Can be updated to look better in the future

  //Will need to update so that button is only available if form is dirty
  //Use react hook form

  return (
    <div class="modal">
      <div class="modal-content">
        <span class="close" onClick={closeModal}>
          X
        </span>
        <h2>Purchase Details</h2>
        <ul style={{ listStyleType: "none" }}>
          {Object.entries(purchase.attributes).map(([key, value]) => {
            if (key === "date") {
              return (
                <li>
                  <label for="dateInput">{key}:</label>
                  <input
                    type="date"
                    id="dateInput"
                    name="dateInput"
                    value={value.toISOString().split("T")[0]}
                  />
                </li>
              );
            } else if (
              key === "description" ||
              key === "store" ||
              key === "price"
            ) {
              return (
                <li>
                  <label for="{key}Input">{key}:</label>
                  <input
                    type="text"
                    id={`${key}Input`}
                    name={`${key}Input`}
                    value={value}
                  />
                </li>
              );
            } else if (key !== "createdAt" && key !== "updatedAt") {
              console.log(key, value);
              return (
                <li>
                  <b>{key}:</b>
                  {value}
                </li>
              );
            } else {
              return <span></span>;
            }
          })}
        </ul>
        <button class="btn btn-primary" onClick={closeModal}>
          Update Entry
        </button>
      </div>
    </div>
  );
};

export default PurchaseModal;
