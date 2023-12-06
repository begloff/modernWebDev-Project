import { useState } from "react";

const TableQuery = ({ onQuery }) => {
  const initialSearchParams = {
    description: "",
    store: "",
    startDate: "",
    endDate: "",
    amountMin: "",
    amountMax: "",
  };
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  //Search params will eventually be an object, but for now it is just a string
  //Only description is searchable right now, but this can be updated to include other fields

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    onQuery(searchParams);
  };

  const handleClear = () => {
    setSearchParams(initialSearchParams); // Resetting to initial state
    onQuery(""); // Optionally, trigger the query action with empty parameters
  };

  //E is passed in default within both functions for context

  return (
    <form onSubmit={handleQuerySubmit} style={{ width: "100%" }}>
      <div
        className="row"
        style={{
          marginBottom: "25px",
          marginTop: "25px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="searchFields"
          style={{
            display: "flex", // Use flexbox to display elements in a row
            width: "calc(100% - 120px)", // Adjust width for both inputs and buttons
          }}
        >
          <input
            type="text"
            id="description"
            className="form-control"
            placeholder="Search by Description"
            name="description"
            value={searchParams.description}
            onChange={handleSearchChange}
            style={{ marginRight: "10px", flex: 1 }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search by Store"
            name="store"
            value={searchParams.store}
            onChange={handleSearchChange}
            style={{ marginRight: "10px", flex: 1 }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search by Start Date"
            name="startDate"
            value={searchParams.startDate}
            onChange={handleSearchChange}
            style={{ marginRight: "10px", flex: 1 }}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search by End Date"
            name="endDate"
            value={searchParams.endDate}
            onChange={handleSearchChange}
            style={{ marginRight: "10px", flex: 1 }}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Min Amount"
            name="amountMin"
            value={searchParams.amountMin}
            onChange={handleSearchChange}
            style={{ marginRight: "10px", flex: 1 }}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Max Amount"
            name="amountMax"
            value={searchParams.amountMax}
            onChange={handleSearchChange}
            style={{ marginRight: "10px", flex: 1 }}
          />
          <button
            className="btn btn-primary"
            type="submit"
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            Search
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleClear}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default TableQuery;
