import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./components/CharacterList";
import SearchBar from "./components/SearchBar";
import { InputContext } from "./context/InputContext";
import Pagination from "./components/Pagination";

function App() {
  const [inputText, setInputText] = useState("");
  const [characters, setCharacters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /**
   * Set current page back to 1 when input change
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [inputText]);

  /**
   * axios call when input change or when user change characters page
   */
  useEffect(() => {
    setLoading(true);
    const delayDebounce = setTimeout(() => {
      axios
        .get(`${process.env.REACT_APP_URL}/search`, {
          params: {
            input: inputText,
            index: currentPage - 1,
          },
        })
        .then((res) => {
          setCharacters(res.data);
          setLoading(false);
        });
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [inputText, currentPage]);

  function handlePagination(pageNum) {
    setCurrentPage(pageNum);
  }

  return (
    <>
      <div className="title-container">
        <p>Comic Movies Search</p>
      </div>
      <InputContext.Provider value={[inputText, setInputText]}>
        <SearchBar />
        <Pagination
          currentPage={currentPage}
          length={characters.maxPage}
          handlePagination={handlePagination}
        />
        {!loading ? (
          <div className="container">
            <CharacterList characters={characters.results} />
          </div>
        ) : (
          <div className="loading-container">
            <div className="lds-hourglass"></div>
          </div>
        )}
      </InputContext.Provider>
    </>
  );
}

export default App;
