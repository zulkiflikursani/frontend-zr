import React from "react";

function FilterComponen(props) {
  const { inputValue, onFilter } = props;
  return (
    <input
      type="search"
      className="shadow-sm bg-red-200 border border-gray-700900 rounded-md py-1 px-2   "
      placeholder="Search"
      onChange={onFilter}
      filtertext={inputValue}
    />
  );
}

export default FilterComponen;
