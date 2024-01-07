import React from "react";
import SearchBar from "./SearchBar";

function TopBar() {
  return (
    <div className="flex h-20 items-center justify-center border-b-2">
      <SearchBar />
    </div>
  );
}

export default TopBar;
