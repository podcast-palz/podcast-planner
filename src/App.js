import React, { Component } from "react";
import "./App.css";

import listenApi from "./listenApi";

import firebase from './firebase'

import Header from './Header/Header.js';
import Podcast from './Podcast/Podcast';
// import Playlist from './Playlist/Playlist';
// import Form from './Form/Form'
// import Playlist from './Components/Playlist'
import SideMenu from './SideMenu/SideMenu';

import Footer from './Footer/Footer.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      genre: "",
      genreString: "",
      podcasts: [],
			userTime: 20,
			isLoading: true,
			userPlaylist: [],
			uid: '',
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
		

  // firebase

 	const dbRef = firebase.database().ref();
    // listen for changes to db and updateA
    dbRef.on('value', response => {
      const newState = [];
      const data = response.val();
			const user = data.users[this.state.uid];
			console.log(data);
      console.log(user);

      for (let key in user) {
				console.log(key);
        newState.push({key: key, data: user[key]});
      }
      // console.log(newState);
      this.setState({
        userPlaylist: newState
      })
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
		const dbRef = firebase.database().ref();

    // const genreString = this.state.genreString;
    const { genre, genreString, userTime } = this.state;

		/** @type {number} minimum length of time to search */
    const len_min = 'string';
    const len_max = parseInt(userTime) + 5;
    console.log({len_min, len_max})

    listenApi("search", {
      q: genreString,
      len_min,
      len_max,
      genre_ids: genre,
      // sort_by_date: 1,
      language: "English",
    }).then(response => {
      console.log(response.data.results);
      this.setState({
        podcasts: response.data.results,
        isLoading: false,
      }, () => {
				// dbRef.child('users').child(this.state.uid).push(this.state.podcasts[0]);
			})
    })


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
      },
      () => {
        //callback function to be run after state is set
        // TODO get rid of this before production
        // this.getPodcasts(); // get podcasts on genre select
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
    this.getPodcasts();
  };

	/**
   * Removes playlist item from firebase on click in the slideout menu.
   * @param {String} key onClick
   */
	removePlaylistItem = key => {
		const dbRef = firebase.database().ref();
		dbRef.child('users').child(this.state.uid).child(key).remove();
	}

	/**
   * Removes entire playlist from firebase, based on the key. 
   * @param {string} key 
   */
	removePlaylist = key => {
		const dbRef = firebase.database().ref();
		dbRef.child('users').child(this.state.uid).remove();
	}

	/**
   * Adds podcast to firebase playlist
   * @param {object} podcast 
   */
	addToPlaylist = podcast => {
		console.log('add', podcast);
		const dbRef = firebase.database().ref();

		dbRef.child('users').child(this.state.uid).push(podcast);

	}


  render() {
		const { isLoading, podcasts, userPlaylist, userTime, genres } = this.state;

		// console.log(this.removePlaylistItem);

    return (
      <div className="App">
        <Header 
					setUserTime={this.setUserTime}
					userTime={userTime}
					selectGenre={this.selectGenre}
					genres={genres}
					handleSubmit={this.handleSubmit}
				/>

        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="podcastContainer">
            <Podcast podcasts={podcasts} add={this.addToPlaylist} />
          </div>
        )}

				<SideMenu
					playlist={userPlaylist}
					remove={this.removePlaylist}
					removeItem={this.removePlaylistItem}
				/>

				<Footer />

      </div>
    );
  }
}

export default App;
