import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import './index.css'

export default class Playlist extends Component {
	constructor() {
		super();
		this.state = {
			currentTitle: '',
		}
	}

	componentDidMount() {
		this.setState({
			currentTitle: this.props.playlist.playlist_title,
		})
	}

	render() {
		const { playlist, removeItem, remove, setActive, current, updateName, userTime } = this.props;
		const { key, playlist_title } = playlist;
    const totalTime = [];

		/** 
		* unfocus this element on enter
		*/
		const unfocus = (e) => {
			if (e.key === 'Enter') {
				document.getElementById(playlist.key).blur();
			}
		}

    // Display time information for user
    const showTime = () => {
			const total = Math.round(totalTime.reduce((a, b) => a + b))
			return (
        <li className="showTime">
					<p> <span className={total > userTime ? 'alert' : ''}>{total}</span> / {userTime} Minutes</p>
        </li>
      )
		}
  
    return (
      <li key={key} className={`Playlist ${key === current ? "selected" : ""}`} onClick={() => setActive(key, this.state.currentTitle)}>
        <button
          onClick={() => setActive(key, this.state.currentTitle)}
          className="selectPlaylist"
          aria-label="Select Playlist"
        ></button>

        <h3>
          <label className="sr-only" htmlFor={key}>
            {playlist_title}
          </label>
          <input
            onChange={updateName}
            onKeyDown={unfocus}
            type="text"
            id={key}
            value={playlist_title}
            placeholder="Untitled Playlist"
          />
        </h3>

        <button className="Playlist-delete" onClick={() => remove(key)} aria-label="Delete Playlist">
          <FontAwesomeIcon icon={faTimes}/>
        </button>

        <ul>
          {playlist.data.map((podcast) => {
            // if podcast has data, and isn't the title
            if (podcast.data && podcast.key !== "playlist_title") {
              const {
                title_original,
                listennotes_url,
                audio_length_sec,
              } = podcast.data;
              const minutes = parseInt(audio_length_sec) / 60;
              totalTime.push(minutes);
              return (
                <li key={podcast.key}>
                  <a href={listennotes_url} rel="noreferrer">
                    {title_original}
                  </a>
                  <button
                    className="remove"
                    onClick={() => removeItem(podcast.key)}
                    aria-label="Remove Podcast"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </li>
              );
            }
          })}
        </ul>
        <ul>
        {totalTime.length !== 0 ? showTime() : null}
        </ul>
      </li>
    );
  }
}
  

