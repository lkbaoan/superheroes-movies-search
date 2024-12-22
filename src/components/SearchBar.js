import React, { useState, useContext } from "react";
import { InputContext } from "../context/InputContext";

function SearchBar() {
  const [inputText, setInputText] = useContext(InputContext);

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="search-container">
      <input
        className="search-bar"
        type="text"
        id="header-search"
        onChange={inputHandler}
        placeholder="Search for characters"
        name="s"
      />
    </div>
  );
}

export default SearchBar;
