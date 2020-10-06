import React, { Component } from "react";
import "./App.css";

import listenApi, { errorResponse } from "./listenApi";

import firebase from './firebase'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Header from './Header/Header.js';
import Podcast from './Podcast/Podcast';
// import Playlist from './Playlist/Playlist';
// import Form from './Form/Form'
// import Playlist from './Components/Playlist'
import SideMenu from './SideMenu/SideMenu';

import Footer from './Footer/Footer.js';
import Playlist from "./Playlist/Playlist";

import PodcastInfo from './PodcastInfo/PodcastInfo'

class App extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      genre: "",
      genreString: "",
      podcasts: [],
			userTime: 20,
			isStarted: false,
			isLoading: false,
			userPlaylist: [],
			uid: '',
			userPlaylists: [],
			currentPlaylist: '',
      playlistName: '',

      offset: 10,

    };
  }

  // at runtime
  componentDidMount() {
		// retrieving the genres, storing them in state.
    listenApi("genres", { top_level_only: 1 }).then((response) => {
			console.log(response.status);
			this.setState({
        genres: response.data.genres,
      });
    }).catch(error => {
			alert(errorResponse(error));
		});
    // get podcasts at runtime (any genre)
		// this.getPodcasts();
		

  // firebase

 	const dbRef = firebase.database().ref();
    // listen for changes to db and updateA
    dbRef.on('value', response => {
      const newState = [];
      const data = response.val();
			
			let playlistKey = '';

			// if the database isn't empty
			if (data) {
				const user = data.users[this.state.uid];
	// 			console.log('data', data);
	//       console.log('user', user);

				// if the user exists
				if (user) {
					// loop through playlists
					for (let playlist in user) {
						
						// if no playlist selected, set as this playlist
						if (!this.state.currentPlaylist) {
							this.setState({
								currentPlaylist: playlist,
							})
						}
						

						const newPlaylist = [];

						// loop through podcasts inside playlist
						for (let podcast in user[playlist]) {
							if (podcast !== 'playlist_title') {
								newPlaylist.push({ key: podcast, data: user[playlist][podcast]})
								// console.log('playlist', playlist[podcast]);
							}
						}
						
						// console.log('newPlaylist', newPlaylist);

						// playlistKey = playlist;
						// console.log(key);
						newState.push({ key: playlist, playlist_title: user[playlist].playlist_title, data: newPlaylist });
					}
					// console.log(newState);

					console.log('playlistKey', playlistKey);
					console.log('newState', newState);
					this.setState({
						userPlaylists: newState,
					})

				} else {
					// if the user doesn't exist
					this.setState({
						userPlaylists: [],
					})
				}
			} else {
				this.setState({
					userPlaylists: [],
				})
			}

	      
		})


		firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
        // ...
      });

			firebase.auth().onAuthStateChanged( (user) => {
        if (user) {
          // User is signed in.
          // var isAnonymous = user.isAnonymous;
					const uid = user.uid;
					console.log(uid);

					this.setState({
						uid,
					})

          // ...
        } else {
					// User is signed out.
					console.log('User signed out');
          // ...
        }
        // ...
      });


	}

	/** retrieving podcasts with api call from passed params. storing results in state. */
  getPodcasts() {

		this.setState({
			isStarted: true,
			isLoading: true,
		})

    // const genreString = this.state.genreString;
    const { genre, genreString, userTime, offset } = this.state;

    const len_min = 4;
    const len_max = parseInt(userTime) + 5;
    // console.log({len_min, len_max})

    listenApi("search", {
      q: genreString,
      len_min,
      len_max,
      offset: offset,
      genre_ids: genre,
      // sort_by_date: 1,
      language: "English",
    }).then(response => {
      console.log(response);
      console.log(response.data.results);
      this.setState({
        podcasts: response.data.results,
        isLoading: false,
      })
		}).catch(error => {
			alert(errorResponse(error));
		});


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


	/**
	 * Set genre in state to reflect the user selected genre. 
	 * @param {event} event onChange
	 */
   selectGenre = (event) => {
    this.setState(
      {
        genre: event.target.value,
        genreString: event.target[event.target.selectedIndex].text,
      }
    );
  };

  /**
   * Set userTime in state to reflect the user's choice.
   * @param {event} event onChange
   */
  setUserTime = (event) => {
    this.setState({
      userTime: event.target.value,
    });
  };

  /**
   * Get podcasts on user click of submit button. Calls function that has the API call.
   * @param {event} event onClick
   */
  handleSubmit = (event) => {
		event.preventDefault();
		if (this.state.genre) {
			this.getPodcasts();
		} else {
			alert('Please select a genre');
		}
  };

	/**
   * Removes playlist item from firebase on click in the slideout menu.
   * @param {String} key onClick
   */
	removePlaylistItem = key => {
		const dbRef = firebase.database().ref();
		const { uid, currentPlaylist } = this.state;
		dbRef.child('users').child(uid).child(currentPlaylist).child(key).remove();
	}


	/**
   * Removes entire playlist from firebase, based on the key. 
   * @param {string} key 
   */
	removePlaylist = key => {
		console.log('removePlaylist', key);
		const dbRef = firebase.database().ref();
		const { uid, userPlaylists } = this.state;
		dbRef.child('users').child(uid).child(key).remove();

		// Reset active playlist
			this.setState({
				currentPlaylist: '',
			})
	}

	/**
   * Adds podcast to firebase playlist
   * @param {object} podcast 
   */
	addToPlaylist = podcast => {
		const dbRef = firebase.database().ref();
		const { uid, userPlaylists, currentPlaylist, playlistName } = this.state;

		// if playlist doesn't have content
		if (!userPlaylists.length) {
			this.createPlaylist(podcast);
		} else { // if playlist has content
			dbRef.child('users').child(uid).child(currentPlaylist).push(podcast);
		}
	}


	/** Create a new playlist */
	createPlaylist = podcast => {
		const dbRef = firebase.database().ref();
		const { uid, currentPlaylist, playlistName } = this.state;
		const newKey = dbRef.child('users').child(uid).push().key;
		// console.log('newKey', newKey);


		this.setState({
			currentPlaylist: newKey,
		}, () => {
			console.log({uid, currentPlaylist, podcast});
			dbRef.child('users').child(uid).child(newKey).set({playlist_title: "Untitled Playlist"});
			dbRef.child('users').child(uid).child(newKey).push(podcast);
		})
	}

	/** set the currently active playlist */
	setActivePlaylist = key => {
		console.log('active: ', key);
		this.setState({
			currentPlaylist: key,
		})
	}


	/** 
	 * Rename playlist in database
	 * @param {string} key The key of the podcast to rename
	 */
	renamePlaylist = key => {
		const dbRef = firebase.database().ref();
		const { uid, currentPlaylist, playlistName } = this.state;
		console.log('rename', key, playlistName);

		dbRef.child('users').child(uid).child(currentPlaylist).child('playlist_title').set(playlistName);
	}

	/** Uupdate playlist name in state on user input */
	updatePlaylistName = event => {
		const newName = event.target.value;
		this.setState({
			playlistName: newName,
		}, this.renamePlaylist)
  }
  
  // rerenders the page when the user clicks next page
  nextPage = (event) => {
    console.log('clicked!')
    // const offset = this.state.offset;
    this.setState({
      offset: this.state.offset + 10,
    })
    this.getPodcasts();
  }

  prevPage = (event) => {
    this.setState({
      offset: this.state.offset - 10,
    })
    this.getPodcasts();
  }


  render() {
		const { isLoading, podcasts, userPlaylists, userTime, genres, currentPlaylist, playlistName, isStarted } = this.state;

		// console.log(this.removePlaylistItem);

    // const HeaderProps = {
    //   setUserTime: this.setUserTime,
    //   userTime: userTime,
    //   selectGenre: this.selectGenre,
    //   genres: genres,
    //   handleSubmit: this.handleSubmit,
    // }

    return (

          <Router>
            <div className="App">
              
              <Route exact path="/"
                render={(props) => <Header {...props}
                  setUserTime={this.setUserTime}
                  userTime={userTime}
                  selectGenre={this.selectGenre}
                  genres={genres}
                  handleSubmit={this.handleSubmit} />} 
              />
      
              {isLoading ? (
                <p className="loading">Loading...</p>
              ) : (
                <div className="podcastContainer">
                  <Route exact path="/" 
                  render={(props) => <Podcast {...props}
                  podcasts={podcasts} add={this.addToPlaylist} /> }
                  /> 
                  <div class="wrapper">

                    {this.state.podcasts.length != 0 ? 
                    (<>
                      {this.state.offset >= 20 ? 
                        (<button className="pageButton" onClick={() => this.prevPage()}>Previous Page</button>) 
                        : (null) }  
                      <button className="pageButton" onClick={() => this.nextPage()}>Next Page</button>
                    </>)
                      : (null)}

                  </div>
                </div>
              )}

              <Route path="/podcast/:podcastID" component={PodcastInfo} />
          
              <Route exact path="/"
                render={(props) => <SideMenu {...props}
                  playlists={userPlaylists}
                  remove={this.removePlaylist}
                  removeItem={this.removePlaylistItem}
                  createPlaylist={this.createPlaylist}
                  setActive={this.setActivePlaylist}
                  current={currentPlaylist}
                  rename={this.renamePlaylist}
                  updateName={this.updatePlaylistName}
                  title={playlistName}
                />}
              />
      
              <Route path="/"
                render={(props) => <Footer {...props} />}
              />
      
            </div>
          </Router>

    );
  }
}

export default App;
