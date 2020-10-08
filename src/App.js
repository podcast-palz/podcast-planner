import React, { Component } from "react";
import "./App.css";

import listenApi, { errorResponse } from "./listenApi";

import firebase from './firebase'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header/Header.js';
import Podcast from './Podcast/Podcast';
import SideMenu from './SideMenu/SideMenu';
import Footer from './Footer/Footer.js';
import swal from 'sweetalert';


class App extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      genre: "",
      genreString: "",
      podcasts: [],
			userTime: 20,
			selectedTime: 20,
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

  // Runtime
  componentDidMount() {
		// retrieving the genres, storing them in state.
    listenApi("genres", { top_level_only: 1 }).then((response) => {
			this.setState({
        genres: response.data.genres,
      });
    }).catch(error => {
			swal(errorResponse(error));
		});


  // Firebase reference
 	const dbRef = firebase.database().ref();
    // listen for changes to db and update state accordingly
    dbRef.on('value', response => {
      const newState = [];
      const data = response.val();

			// if the database isn't empty
			if (data) {
				const user = data.users[this.state.uid];

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
							}
						}
						
						newState.push({ key: playlist, playlist_title: user[playlist].playlist_title, data: newPlaylist });
					}

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
        // if the database is empty
				this.setState({
					userPlaylists: [],
				})
			}
		})

    // firebase anonymous auth
		firebase
      .auth()
      .signInAnonymously()
      .catch(function (error) {
        // Handle Errors here.
        const errorMessage = error.message;
        swal(errorMessage);
      });

			firebase.auth().onAuthStateChanged( (user) => {
        if (user) {
          // User is signed in.
					const uid = user.uid;
					this.setState({
						uid,
					})

        } else {
          swal('Error with firebase userID')
        }
      });
	}

	/** retrieve podcasts with api call from passed params. Store results in state. */
  getPodcasts() {
		this.setState({
			isStarted: true,
			isLoading: true,
			selectedTime: this.state.userTime,
		})

    const { genre, genreString, userTime, offset } = this.state;
    const len_min = 4;
    const len_max = parseInt(userTime) + 5;

    listenApi("search", {
      q: genreString,
      len_min,
      len_max,
      offset: offset,
      genre_ids: genre,
      language: "English",
    }).then(response => {
      this.setState({
        podcasts: response.data.results,
        isLoading: false,
      })
		}).catch(error => {
			swal(errorResponse(error));
		});
  }
 
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
		  swal('Please select a genre!');
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

		const dbRef = firebase.database().ref();
		const { uid } = this.state;
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
		const { uid, userPlaylists, currentPlaylist } = this.state;

		// if playlist doesn't have content
		if (!userPlaylists.length) {
			this.createPlaylist(podcast);
		} else { // if playlist has content
			dbRef.child('users').child(uid).child(currentPlaylist).push(podcast);
    }
    
    // toggle side menu
    document.getElementById("hamburger").checked = true;
	}


	/** 
   * Create a new playlist 
   * @param {object} podcast
   * */
	createPlaylist = podcast => {
		const dbRef = firebase.database().ref();
		const { uid } = this.state;
		const newKey = dbRef.child('users').child(uid).push().key;

		this.setState({
			currentPlaylist: newKey,
		}, () => {
			dbRef.child('users').child(uid).child(newKey).set({playlist_title: "Untitled Playlist"});
			dbRef.child('users').child(uid).child(newKey).push(podcast);
		})
	}

  /** 
   * Set playlist as active 
   * @param {string} key
   * @param {string} currentTitle
   * */
	setActivePlaylist = (key, currentTitle) => {
		this.setState({
			currentPlaylist: key,
			playlistName: currentTitle,
		})
	}


	/** 
	 * Rename playlist in database
	 * @param {string} key The key of the podcast to rename
	 */
	renamePlaylist = key => {
		const dbRef = firebase.database().ref();
		const { uid, currentPlaylist, playlistName } = this.state;

		dbRef.child('users').child(uid).child(currentPlaylist).child('playlist_title').set(playlistName);
	}

	/** 
   * Update playlist name in state on user input 
   * @param {event} event
   * */
	updatePlaylistName = event => {
		const newName = event.target.value;
		this.setState({
			playlistName: newName,
		}, this.renamePlaylist)
  }
  
  /**
   * rerenders the page when the user clicks next page 
   * @param {event} event
   * */
  nextPage = (event) => {
    setTimeout(() => {
      this.setState({
        offset: this.state.offset + 10,
      })
      this.getPodcasts();
    }, 400);

    // scroll to top of page
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  /**
  * rerenders the page when the user clicks previous page
  * @param {event} event
  * */
  prevPage = (event) => {
    setTimeout(() => {
      this.setState({
        offset: this.state.offset - 10,
      });
      this.getPodcasts();
    }, 400);

    // scroll to top of page
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  /**
   * sort through podcast length through onClick asc + desc buttons
   * @param {string} sortType asc or desc
   * */
  sortPodcasts = (sortType) => {
    const sortedPodcasts = [...this.state.podcasts]
    sortedPodcasts.sort((a, b) => (sortType === 'asc') ? parseFloat(a.audio_length_sec) - parseFloat (b.audio_length_sec) : parseFloat(b.audio_length_sec) - parseFloat (a.audio_length_sec));
    this.setState({
      podcasts:sortedPodcasts,
    })
  }

  render() {
		const { isLoading, podcasts, userPlaylists, userTime, genres, currentPlaylist, playlistName, isStarted } = this.state;

    return (
			<Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            
            <Route exact path="/"
              render={(props) => <Header {...props}
                setUserTime={this.setUserTime}
                userTime={userTime}
                selectGenre={this.selectGenre}
                genres={genres}
                handleSubmit={this.handleSubmit}
                loading={isLoading} />}
            />
    
            {!isStarted ? <p className="loading">Select Genre to Continue</p> :
            isLoading ? (
              <p className="loading">Loading...</p>
            ) : (
              <main className="podcastContainer">
                <Route exact path="/" 
                render={(props) => <Podcast {...props}
                podcasts={podcasts} add={this.addToPlaylist} sort={this.sortPodcasts} isStarted={isStarted} /> }
                /> 
                <div class="page wrapper">

                  {this.state.podcasts.length !== 0 ? 
                  (<>
                    {this.state.offset >= 20 ? 
                      (<button className="pageButton" onClick={() => this.prevPage()}>⬅ Previous Page</button>) 
                      : (null) }  
                    <button className="pageButton" onClick={() => this.nextPage()}>Next Page ➡</button>
                  </>)
                    : (null)}

                </div>
              </main>
            )}
        
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
                userTime={this.state.selectedTime}
                title={playlistName}
              />}
            />
    
            <Route path="/"
              render={(props) => <Footer {...props} 
                isStarted={this.state.isStarted}
              />}
            />
    
          </div>
        </Router>
    );
  }
}

export default App;


  // NOTE: Due to limitations of the listennotes API we are currently unable to retrieve and sort podcasts in the way we'd like to. This code is leftover from our earlier work and may be used again at some point in the future.

  // listenApi("best_podcasts", { genre_id: this.state.genre }).then(
  //   (response) => {
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


  //       // get average time of episodes
  //       const avg_minutes = this.getAverageTime(episodes);

  //       listCopy[index].avg_minutes = avg_minutes;
  //       this.setState({
  //         podcasts: listCopy,
  //         isLoading: false,
  //       });

  //     });

  //   });

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


  //   return minutes;
  // }
