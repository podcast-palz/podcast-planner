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
      isLoading: true,
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
    // this.getPodcasts();
  }

  // retrieving podcasts with api call from passed params. storing results in state.
  getPodcasts() {
    // listenApi("best_podcasts", { genre_id: this.state.genre }).then(
    //   (response) => {
    //     console.log(response.data.podcasts);
    //     this.setState(
    //       {
    //         podcasts: response.data.podcasts,
    //       }
    //       // () => {
    //       //   const listCopy = [...this.state.podcasts];
    //       //   listCopy.forEach((podcast, index) => {
    //       //     listCopy[index].avg_minutes = 0;
    //       //   });

    //       //   this.setState({
    //       //     podcasts: listCopy,
    //       //   });
    //       // }
    //     );
    //     this.getPodcastTimes();
    //   }
    // );
  }

  /** get average time of podcast episodes and store in state */
  // getPodcastTimes = () => {
  //   // make copy of podcast state
  //   let listCopy = [...this.state.podcasts];

  //   // list of podcast IDs
  //   const podcastIDs = listCopy.map((podcast) => podcast.id);

  //   // loop through podcast IDs and add average episode times to list copy
  //   podcastIDs.forEach((id, index) => {
  //     listenApi(`podcasts/${id}`).then((response) => {
  //       const episodes = response.data.episodes;
  //       console.log(episodes);

  //       // get average time of episodes
  //       const avg_minutes = this.getAverageTime(episodes);

  //       listCopy[index].avg_minutes = avg_minutes;
  //       this.setState({
  //         podcasts: listCopy,
  //         isLoading: false,
  //       });
     
  //     });
   
  //   });
  //   // console.log(listCopy);

  //   // replace podcast state with new list containing average minutes


  // };

  // /** Get average time of episodes */
  // getAverageTime(episodes) {
  //   let total = 0;
  //   // loop through episodes, return the total audio length in seconds for each epsiode.
  //   episodes.forEach((episode) => {
  //     total += episode.audio_length_sec;
  //   });
  //   // converting average time from seconds to minutes for each podcast
  //   const minutes = Math.round(total / episodes.length / 60);

  //   console.log(minutes);
  //   return minutes;
  // }


  // set genre in state on change of select dropdown
  selectGenre = (event) => {
    this.setState(
      {
        genre: event.target.value,
      },
      () => {
        //callback function to be run after state is set
        // TODO get rid of this before production
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
  };

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

          <button onClick={this.handleSubmit} type="submit">
            Submit
          </button>
        </form>


        {this.state.isLoading ? <p>Loading...</p> :     
          <ul>
            {this.state.podcasts.map((podcast) => {
              return (
                <div key={podcast.id} className="podcast">
                  <h2>{podcast.title}</h2>
                  <p>{podcast.description}</p>
                  <p>{podcast.avg_minutes}</p>
                </div>
              );
            })}
          </ul>
        }
      </div>
    );
  }
}

export default App;
