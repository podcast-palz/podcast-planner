import React, { Component } from "react";
import "./App.css";

import listenApi from "./listenApi";

class App extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      genre: "",
      podcasts: [],
      userTime: 0,
    };
  }

  // at runtime
  componentDidMount() {
    // retrieving the genres, storing them in state.
    listenApi("genres", { top_level_only: 1 }).then((response) => {
      this.setState({
        genres: response.data.genres,
      });
    });
    // get podcasts at runtime (any genre)
    this.getPodcasts();
  }

  // retrieving podcasts with api call from passed params. storing results in state.
  getPodcasts() {
    listenApi("best_podcasts", { genre_id: this.state.genre }).then(
      (response) => {
        this.setState({
          podcasts: response.data.podcasts,
        });
      }
    );
  }

  // set genre in state on change of select dropdown
  selectGenre = (event) => {
    this.setState(
      {
        genre: event.target.value,
      },
      () => {
        //callback function to be run after state is set
        // this.getPodcasts(); // get podcasts on genre select
      }
    );
  };

  // set user time in state on change of slider
  setUserTime = (event) => {
    this.setState({
      userTime: event.target.value,
    });
  };

	
	// get podcasts on form submit
	handleSubmit = (event) => {
		event.preventDefault();
		this.getPodcasts();
	}

  render() {
    return (
      <div className="App">
        <form action="submit">
          {/* time slider */}
          <label htmlFor="time">Enter time</label>
          <input
            onChange={this.setUserTime}
            type="range"
            name="time"
            id="time"
            min="0"
            max="120"
            value={this.state.userTime}
          />
          {/* display time selected */}
          <span>{this.state.userTime}</span>

          {/* genre select */}
          <label htmlFor="genre"></label>
          <select onChange={this.selectGenre} name="genre" id="genre">
            <option value="">Choose genre</option>
            {this.state.genres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>

					<button onClick={this.handleSubmit} type="submit">Submit</button>
        </form>

        <ul>
          {this.state.podcasts.map((podcast) => {
            return (
              <div key={podcast.id} className="podcast">
                <h2>{podcast.title}</h2>
                <p>{podcast.description}</p>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
