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
      let res = await axios.get(`${process.env.REACT_APP_URL}/character`, {
        params: {
          apiCode: character.api_detail_url.split("/")[5],
        },
      });
      setCharDetail(res.data.results);
      let m = [];
      res.data.results.movies.map((movie) => m.push(movie.name));
      setMovies(m);
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
