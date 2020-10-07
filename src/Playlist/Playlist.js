import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

import './index.css'


export default function Playlist(props) {
	const { playlist, title, removeItem, remove, setActive, current, rename, updateName, userTime } = props;
  const { key, playlist_title } = playlist;
  const totalTime = [];


	/** 
	* unfocus this element on enter
	*/
	function unfocus(e) {
		if (e.key === 'Enter') {
			document.getElementById(key).blur();
		}
  }
  
  // Display time information for user
  function showTime() {
    return (
      <li>
        {Math.round(totalTime.reduce((a, b) => a + b))} / {userTime} Minutes
      </li>
    )
  }


	return (
		<li key={key} className={`Playlist ${key === current ? 'selected' : ''}`} onClick={() => setActive(key)}>
	
			<h3>
				<label className="sr-only" htmlFor={key}>{playlist_title}</label>
				<input 
					onChange={updateName}
					onBlur={() => rename(key)}
					onKeyDown={unfocus}
					type="text"
					id={key}
					value={playlist_title}
				/>
			</h3>

			<button className="Playlist-delete" onClick={() => remove(key)}>
				<FontAwesomeIcon icon={faTimes} />
			</button>
			
			<ul>
				{playlist.data.map((podcast) => {
					// if podcast has data, and isn't the title
					if (podcast.data && podcast.key !== 'playlist_title') {
            const { title_original, listennotes_url, audio_length_sec } = podcast.data;
            const minutes = parseInt(audio_length_sec) / 60;
            totalTime.push(minutes)
            // {totalTime.push()}
						return (
							<li key={podcast.key}>
								<a href={listennotes_url} rel="noreferrer">{title_original}</a>
								<button className="remove" onClick={() => removeItem(podcast.key)}>
									<FontAwesomeIcon icon={faTrashAlt} />
								</button>
							</li>
						);
						}
				})}
        {totalTime.length != 0 ? (showTime()) : null}
			</ul>

		</li>
	)
}
