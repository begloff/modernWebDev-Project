import axios from "axios";
import Parse from "parse";

const url =
  "https://my-json-server.typicode.com/kellybuchanan/WebDev-Spring2021";

// createPurchase objects for each column in json
export const createPurchase = (id, date, description, price, store) => {
  return axios({
    method: "post",
    url: `${url}/purchases`,
    data: {
      id,
      date,
      description,
      price,
      store,
    },
    headers: {
      "Content-Type": "application/json",
    },
    json: true,
  })
    .then((response) => {
      console.log("POST response: ", response);
    })
    .catch((err) => {
      console.log("POST error: ", err);
    });
};

// this function pulls data from the JSON file and returns the response
export const getAllPurchases = () => {
  const Purchases = Parse.Object.extend("Purchases");
  const query = new Parse.Query(Purchases);

  return query.find().then((results) => {
    console.log(results);
    return results;
  });
};
