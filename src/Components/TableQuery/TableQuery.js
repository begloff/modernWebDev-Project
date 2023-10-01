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
      <div class="row" style={{ marginBottom: "25px" }}>
        <div class="col" style={{ flexMargin: "50%" }}>
          <input
            type="text"
            class="form-control"
            placeholder="Search by Description"
            value={searchParams}
            onInput={handleSearchChange}
          />
        </div>
        <div class="col">
          <button class="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default TableQuery;
