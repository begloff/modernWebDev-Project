import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TransactionTable = ({
  transactions,
  toggleEditTransactionModal,
  toggleNewTransactionModal,
  setSelectedTransaction,
  deleteTransaction,
  updateDeletedTransaction,
}) => {
  // Table displays all transaction fields - alternating color based on css
  return (
    <div className="row" style={{ marginTop: "25px" }}>
      <div className="col">
        <div className="table-container" style={{ marginBottom: "25px" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Price</th>
                <th>Store</th>

                <th style={{ textAlign: "center" }}>X</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  style={{ cursor: "pointer" }}
                  key={transaction.id}
                  onClick={() => {
                    toggleEditTransactionModal(transaction);
                    setSelectedTransaction(transaction);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{transaction.attributes.date.toDateString()}</td>
                  <td>{transaction.attributes.description}</td>
                  <td>${transaction.attributes.amount}</td>
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
                    <FontAwesomeIcon icon={faTrash} className="trashIcon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-primary"
          style={{ marginBottom: "15px" }}
          onClick={() => toggleNewTransactionModal()}
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
