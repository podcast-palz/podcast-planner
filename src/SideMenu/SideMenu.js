import React from 'react'
import Playlist from '../Playlist/Playlist'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

import './index.css'


export default function SideMenu(props) {
	const { playlist, remove } = props;
	
	return (
		<>
			<input type="checkbox" name="hamburger" id="hamburger"/>
			<label htmlFor="hamburger"><FontAwesomeIcon icon={faBars} /></label>
			<div className="SideMenu">
				<Playlist playlist={playlist} remove={remove} />
			</div>
		</>
	)
}
