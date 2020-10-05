import React from 'react'
import Playlist from '../Playlist/Playlist'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

import './index.css'


export default function SideMenu(props) {
	const { playlists, remove, removeItem, createPlaylist } = props;
	
	return (
		<>
			<input type="checkbox" name="hamburger" id="hamburger"/>
			<label htmlFor="hamburger">
				<FontAwesomeIcon icon={faBars} />
			</label>
			<div className="SideMenu">
				<h2>Your Playlists</h2>
				
				<button onClick={() => createPlaylist(0)}><FontAwesomeIcon icon={faPlus} /></button>

				{playlists.map(playlist => {
					return <Playlist
						playlist={playlist}
						remove={remove}
						removeItem={removeItem}
					/>
				})}
				
			</div>
		</>
	)
}

