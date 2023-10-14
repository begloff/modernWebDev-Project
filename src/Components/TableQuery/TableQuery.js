import { useState } from "react";

const TableQuery = ({ onQuery }) => {
  const [searchParams, setSearchParams] = useState("");

  //Search params will eventually be an object, but for now it is just a string
  //Only description is searchable right now, but this can be updated to include other fields

  const handleSearchChange = (e) => {
    setSearchParams(e.target.value);
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    onQuery(searchParams);
  };

  //E is passed in default within both functions for context

  return (
    <form onSubmit={handleQuerySubmit} style={{ width: "100%" }}>
      <div className="row" style={{ marginBottom: "25px" }}>
        <div className="col" style={{ flexMargin: "50%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Description"
            value={searchParams}
            onInput={handleSearchChange}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default TableQuery;
