import React from "react";
import Like from "./common/like";

const MoviesTable = props => {
  const { movies, OnDelete, onLike } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Rating</th>
          <th scope="col">Genre</th>
          <th scope="col" />
          <th scope="col" />
        </tr>
      </thead>

      {movies.map(item => {
        return (
          <tbody key={item._id}>
            <tr>
              <td>{item.title}</td>
              <td>{item.rating}</td>
              <td>{item.genre}</td>
              <td>
                <Like onClick={() => onLike(item)} liked={item.liked} />
              </td>
              <td>
                <button
                  onClick={() => OnDelete(item)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default MoviesTable;
