import React from "react";

export default function Pagination({ currentPage, length, handlePagination }) {
  return (
    <div className="pagination">
      <button
        className="nav"
        disabled={currentPage > 1 ? false : true}
        onClick={() => handlePagination(1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="m18.707 4.707-1.414-1.414L8.586 12l8.707 8.707 1.414-1.414L11.414 12l7.293-7.293zM5 3h2v18H5z" />
        </svg>
      </button>
      <button
        className="nav"
        disabled={currentPage > 1 ? false : true}
        onClick={() => handlePagination(currentPage - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
        </svg>
      </button>
      <p>{currentPage}</p>
      <button
        className="nav"
        disabled={currentPage < length ? false : true}
        onClick={() => handlePagination(currentPage + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
        </svg>
      </button>
      <button
        className="nav"
        disabled={currentPage < length ? false : true}
        onClick={() => handlePagination(length)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M17 3h2v18h-2zM5.293 4.707 12.586 12l-7.293 7.293 1.414 1.414L15.414 12 6.707 3.293 5.293 4.707z" />
        </svg>
      </button>
    </div>
  );
}
