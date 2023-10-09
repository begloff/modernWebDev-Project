const TransactionTable = ({
  transactions,
  toggleTransactionModal,
  setSelectedTransaction,
}) => {
  // Table displays all transaction fields - alternating color based on css
  return (
    <div class="row" style={{ marginTop: "25px" }}>
      <div class="col">
        <div class="table-container" style={{ marginBottom: "25px" }}>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Price</th>
                <th>Store</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  style={{ cursor: "pointer" }}
                  key={transaction}
                  onClick={() => {
                    toggleTransactionModal(transaction);
                    setSelectedTransaction(transaction);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{transaction.attributes.date.toDateString()}</td>
                  <td>{transaction.attributes.description}</td>
                  <td>${transaction.attributes.amount}</td>
                  <td>{transaction.attributes.store}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <hr />
      </div>
    </div>
  );
};

export default TransactionTable;