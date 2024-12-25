import React, { useState, useEffect, useRef } from "react";
import Movie from "./Movie";
import axios from "axios";

export default function DetailCharacter({ details, movies, onClose }) {
  const [movieOpen, setMovieOpen] = useState();
  const [movieDetail, setMovieDetail] = useState([]);
  const outside = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (outside.current && !event.composedPath().includes(outside.current)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      if (movies.length === 0) return;
      try {
        let response = await axios.get("/.netlify/functions/movies", {
          params: {
            names: JSON.stringify(movies),
          },
        });
        setMovieDetail(response.data.results);
      } catch (error) {
        console.log("Cannot fetch movies:", error);
      }
    }
    fetchMovies();
  }, [movies]);

  function openMovie(movieId) {
    setMovieOpen(movieId);
  }

  return (
    <div className="modal">
      <div ref={outside} className="modal-box">
        <div className="close-container">
          <button className="close-button" onClick={onClose}>
            <svg viewBox="-10 0 1044 1024">
              <path
                fill="currentColor"
                d="M1024 54 975 4 512 470 49 4 0 54l463 465L6 979l49 49 457-459 457 459 49-49-457-460z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="detail">
          <h1>
            {details.name}
            <i> | Movies</i>
          </h1>
          {movies.length !== 0 ? (
            <div className="movies-list">
              {details.movies.map((each, index) => {
                return (
                  <Movie
                    title={each.name}
                    id={each.id}
                    currentlyOpen={movieOpen}
                    movie={movieDetail[index]}
                    key={each.id}
                    openMovie={openMovie}
                  />
                );
              })}
            </div>
          ) : (
            <div className="no-movie">
              Oops! Seems like this character doesn't have any movies
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
