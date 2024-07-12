import React, { useState } from "react";
import styles from "./searchBar.module.css";

const searchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <input
      className={styles.searchBar}
      type="text"
      placeholder="Search here"
      onChange={(e) => {
        setSearchInput(e.target.value);
      }}
      value={searchInput}
    />
  );
};
export default searchBar;
