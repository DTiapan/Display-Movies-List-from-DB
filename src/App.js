import React, { Component } from "react";
import "./App.css";
import { fakemovies } from "./fakeGenreService";
import Pagination from "./components/common/pagination";
import Like from "./components/common/like";
import { paginate } from "./utils/paginate";
import Listgroup from "./components/common/listgroup";

class App extends Component {
  state = {
    movies: fakemovies,
    currentPage: 1,
    genres: [],
    pageSize: 3
  };

  componentDidMount() {
    let genres = [...new Set(fakemovies.map(x => x.genre))];
    genres = ["All Genres", ...genres];
    this.setState({ genres });
  }
  // getGenre = movies => {

  //   //console.log(genre);
  // };

  handleGenreSelect = genre => {
    //console.log(genre);
    this.setState({ selectedGenre: genre });
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
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const genres = allMovies.map(x => x.genre);

    const filtered = genres.includes(selectedGenre)
      ? allMovies.filter(m => m.genre === selectedGenre)
      : allMovies;

    // const filtered = if (genres.includes(selectedGenre)) {
    //   filtered =  allMovies.filter(m => m.genre === selectedGenre)
    // } else {
    //   filtered = allMovies
    // }

    var countedNames = genres.reduce(function(allNames, name) {
      if (name in allNames) {
        allNames[name]++;
      } else {
        allNames[name] = 1;
      }
      return allNames;
    }, {});
    //console.log(countedNames);
    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <React.Fragment>
        <div className="container">
          <div className="row" style={{ marginTop: 100 }}>
            <div className="col-3">
              <Listgroup
                items={this.state.genres}
                countedGeners={countedNames}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </div>
            <div className="col">
              <main className="container">
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
                itemsCount={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center", marginTop: 100 }}>
          Welcome to Movie Reviews Website
        </h3>
        {this.GetMoviesData()}
      </div>
    );
  }
}

export default App;
