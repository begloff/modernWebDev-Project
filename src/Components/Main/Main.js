import React from "react";
import { useState, useEffect } from "react";

import { getAllPurchases } from "../../Services/Purchases.js";
import PurchaseModal from "../PurchaseModal/PurchaseModal.js";
import TableQuery from "../TableQuery/TableQuery.js";
import PurchaseTable from "../PurchaseTable/PurchaseTable.js";

const Main = () => {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  useEffect(() => {
    // pull all purchases from json, set purchases, and filter purchases
    console.log("fetching");
    getAllPurchases().then((purchases) => {
      console.log(purchases);
      setPurchases(purchases);
      setFilteredPurchases(purchases);
    });
  }, []);

  const handleQuery = (searchParams) => {
    //Controls data displayed in table, will need to be updated to include other fields

    if (searchParams === "") {
      setFilteredPurchases(purchases);
      return;
    }

    // filter purchases based on input
    const filteredPurchases = purchases.filter((purchase) =>
      purchase.attributes.description
        .toLowerCase()
        .includes(searchParams.toLowerCase())
    );
    setFilteredPurchases(filteredPurchases);
  };

  //Modal toggles are passed to other components to allow for the modal to be opened from other components
  const togglePurchaseModal = (purchase) => {
    setSelectedPurchase(purchase);
  };

  const closeModal = () => {
    setSelectedPurchase(null);
  };

  // return the HTML for everything on the page
  return (
    <div>
      <div class="row">
        <div class="col">
          <h1>Finance Manager</h1>
          <hr />
          <hr />
          <PurchaseModal
            isOpen={selectedPurchase !== null}
            closeModal={closeModal}
            purchase={selectedPurchase}
          />

          <TableQuery onQuery={handleQuery} />

          <PurchaseTable
            purchases={filteredPurchases}
            togglePurchaseModal={togglePurchaseModal}
            setSelectedPurchase={setSelectedPurchase}
          />
        </div>
      </div>
      {filteredPurchases.length > 0 && (
        <div class="row">
          <div class="col">
            <h3>
              {" "}
              Total Spent: $
              {filteredPurchases
                .reduce(
                  (total, purchase) =>
                    total + Number(purchase.attributes.price),
                  0
                )
                .toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );

  // The reduce is a bit messy, can put in function in future
};

export default Main;
