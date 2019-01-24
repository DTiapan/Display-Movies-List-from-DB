import React, { Component } from "react";
import "./App.css";
import { fakemovies } from "./fakeGenreService";
import Pagination from "./components/common/pagination";
import Like from "./components/common/like";
import { paginate } from "./utils/paginate";

class App extends Component {
  state = {
    movies: fakemovies,
    currentPage: 1,
    pageSize: 3
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleLike = movie => {
    //console.log(movie + " like clicked");
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  GetMoviesData() {
    if (this.state.movies.length === 0)
      return (
        <p style={{ textAlign: "center" }}>Opps..No movies in the database</p>
      );
    return this.generateMoviesData();
  }

  generateMoviesData() {
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <React.Fragment>
        <main className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>

            {movies.map(item => {
              return (
                <tbody key={item._id}>
                  <tr>
                    <th scope="row">{item._id}</th>
                    <td>{item.title}</td>
                    <td>{item.genre}</td>
                    <td>
                      <Like
                        onClick={() => this.handleLike(item)}
                        liked={item.liked}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(item)}
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
        </main>
        <Pagination
          itemsCount={this.state.movies.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>
          Welcome to Movie Reviews Website
        </h3>
        {this.GetMoviesData()}
      </div>
    );
  }
}

export default App;
