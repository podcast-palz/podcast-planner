import React, {Component} from 'react';
import './App.css';

import { getPodcasts } from "./listenApi";

class App extends Component {
	constructor() {
		super();
		this.state = {
			genres: [],
			genre: '',
			podcasts: [],
		};
	}

  // retrieving the genres, storing them in state. 
	componentDidMount() {
		getPodcasts("genres", {top_level_only: 1}).then(response => {
			console.log(response);

			this.setState({
				genres: response.data.genres,
			})
		})

    // retrieving podcasts with api call from passed params. storing results in state.
		getPodcasts("best_podcasts", {genre_id: this.state.genre}).then(response => {
			console.log(response.data.podcasts);
			this.setState({
				podcasts: response.data.podcasts,
			})
		})
	}
	
	
	render() {
    return (
        <div className="App">
          <form action="submit">
						<label htmlFor="genre"></label>
						<select name="genre" id="genre">
							{this.state.genres.map(genre => {
								return <option value={genre.id}>{genre.name}</option>
							})}
						</select>
					</form>
					
					<ul>
						{this.state.podcasts.map(podcast => {
							return (
                <div className="podcast">
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
