import React from 'react'
import Playlist from '../Playlist/Playlist'

import './index.css'

export default function SideMenu(props) {
	const { playlist, remove } = props;
	
	return (
		<div className="SideMenu">
			<button></button>
			<Playlist playlist={playlist} remove={remove} />
		</div>
	)
}
