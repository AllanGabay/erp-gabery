import React, { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Recherche"
      />
    </div>
  );
};

export default SearchBar;
