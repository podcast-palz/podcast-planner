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
		const { playlist, title, removeItem, remove, setActive, current, rename, updateName } = this.props;
		const { key, playlist_title } = playlist;

		/** 
		* unfocus this element on enter
		*/
		const unfocus = (e) => {
			if (e.key === 'Enter') {
				document.getElementById(playlist.key).blur();
			}
		}

		return (
			<li key={key} className={`Playlist ${key === current ? 'selected' : ''}`} onClick={() => setActive(key, this.state.currentTitle)}>
		
				<h3>
					<label className="sr-only" htmlFor={key}>{playlist_title}</label>
					<input 
						onChange={updateName}
						// onBlur={() => rename(key)}
						onKeyDown={unfocus}
						type="text"
						id={key}
						value={playlist_title}
						placeholder="Untitled Playlist"
					/>
				</h3>

				<button className="Playlist-delete" onClick={() => remove(key)}>
					<FontAwesomeIcon icon={faTimes} />
				</button>
				
				<ul>
					{playlist.data.map((podcast) => {
						// if podcast has data, and isn't the title
						if (podcast.data && podcast.key !== 'playlist_title') {
							const { title_original, listennotes_url } = podcast.data;
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
				</ul>

			</li>
		)
	}
}
