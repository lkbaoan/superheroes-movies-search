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
              <svg
                fill="#000000"
                height="300px"
                width="300px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 295.996 295.996"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path d="M147.998,0C66.392,0,0,66.392,0,147.998s66.392,147.998,147.998,147.998c81.606,0,147.998-66.392,147.998-147.998 S229.604,0,147.998,0z M147.998,279.996c-36.257,0-69.143-14.696-93.022-38.44c-9.536-9.482-17.631-20.41-23.934-32.42 C21.442,190.847,16,170.048,16,147.998C16,75.214,75.214,16,147.998,16c34.523,0,65.987,13.328,89.533,35.102 c12.208,11.288,22.289,24.844,29.558,39.996c8.27,17.239,12.907,36.538,12.907,56.9 C279.996,220.782,220.782,279.996,147.998,279.996z"></path>{" "}
                    <polygon points="79.917,147.953 97.988,129.881 116.06,147.953 127.374,136.639 109.433,118.698 127.373,100.76 116.061,89.445 97.988,107.517 79.916,89.445 68.604,100.76 86.544,118.698 68.603,136.639 "></polygon>{" "}
                    <polygon points="179.917,147.953 197.988,129.881 216.06,147.953 227.374,136.639 209.433,118.698 227.373,100.76 216.061,89.445 197.988,107.517 179.916,89.445 168.604,100.76 186.544,118.698 168.603,136.639 "></polygon>{" "}
                    <path d="M227.664,189.997h-160v16h94v12c0,16.708,12.651,30.546,28.779,32.699c1.436,0.192,2.983,0.301,4.471,0.301 c15.493,0,28.395-10.734,31.925-25.155c0.616-2.517,0.825-5.142,0.825-7.845V189.997z M177.664,205.997h34v12 c0,9.374-7.626,17-17,17c-9.374,0-17-7.626-17-17V205.997z"></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
