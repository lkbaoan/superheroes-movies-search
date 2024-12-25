import React, { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

import DetailCharacter from "./DetailCharacter";

export default function Character({ character }) {
  const [charDetail, setCharDetail] = useState();
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function clickCard() {
    setLoading(true);
    if (charDetail === undefined) {
      try {
        let res = await axios.get("/.netlify/functions/character", {
          params: {
            apiCode: character.api_detail.split("/")[5],
          },
        });
        setCharDetail(res.data.results);
        let m = [];
        res.data.results.movies.map((movie) => m.push(movie.name));
        setMovies(m);
      } catch (error) {
        console.log("Cannot fetch character:", error);
      }
    }
    setLoading(false);
    setShowModal(true);
  }

  return (
    <>
      <button className="card" onClick={clickCard}>
        {!loading ? (
          <>
            <img src={character.icon_url} alt="" />
            <p>{character.name}</p>
          </>
        ) : (
          <div className="loading-container">
            <div className="lds-hourglass"></div>
          </div>
        )}
      </button>

      {showModal &&
        createPortal(
          <DetailCharacter
            details={charDetail}
            movies={movies}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  );
}
