import React from "react";
import SearchBar from "./SearchBar";
import { ThemeSwitch } from "./themeSwitch";

function TopBar() {
  return (
    <div className="flex h-20 items-center justify-center">
      <div className="mr-2 md:hidden">
        <ThemeSwitch />
      </div>
      <SearchBar />
    </div>
  );
}

export default TopBar;
