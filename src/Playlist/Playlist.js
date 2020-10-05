import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

import './index.css'

export default function Playlist(props) {
	const { playlist, title, removeItem, remove } = props;
		
	// console.log(remove);
	// console.log(removeItem);

	console.log('playlist', playlist);

	return (
		<div className="Playlist">
			<h3>
				<label className="sr-only" htmlFor="">{title ? title : "Untitled Playlist"}</label>
				<input type="text" id="" placeholder={title ? title : "Untitled Playlist"}/>
			</h3>

			<button className="Playlist-delete" onClick={() => remove(playlist.key)}>
				<FontAwesomeIcon icon={faTimes} />
			</button>
			
			<ul>
				{playlist.data.map((podcast) => {
					// if podcast contains data
					if (podcast.data) {
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

		</div>
	)
}
