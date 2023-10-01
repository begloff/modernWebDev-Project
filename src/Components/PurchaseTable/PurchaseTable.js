const PurchaseTable = ({
  purchases,
  togglePurchaseModal,
  setSelectedPurchase,
}) => {
  // Table displays all purchase fields - alternating color based on css
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
              {purchases.map((purchase, index) => (
                <tr
                  style={{ cursor: "pointer" }}
                  key={purchase}
                  onClick={() => {
                    togglePurchaseModal(purchase);
                    setSelectedPurchase(purchase);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{purchase.attributes.date.toDateString()}</td>
                  <td>{purchase.attributes.description}</td>
                  <td>${purchase.attributes.price}</td>
                  <td>{purchase.attributes.store}</td>
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

export default PurchaseTable;
