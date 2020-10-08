import React, { Component } from 'react'
import Playlist from '../Playlist/Playlist'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

import './index.css'

/**
 * Rendering the side menu
 * @param {*} props 
 */
export default class SideMenu extends Component {
	constructor() {
		super();
		this.state = {
			isToggled: false,
		}
	}

	toggle = (e) => {
		this.setState({
			isToggled: e.target.checked,
		})
	}

	render() {
		const { playlists, remove, removeItem, createPlaylist, setActive, current, rename, updateName, title, userTime } = this.props;
		return (
      <>
        <input
          onChange={this.toggle}
          type="checkbox"
          name="hamburger"
          id="hamburger"
        />
        <label htmlFor="hamburger">
          <FontAwesomeIcon icon={this.state.isToggled ? faTimes : faBars} />
        </label>
        <div className="SideMenu">
          <h2>Your Playlists</h2>

          <button onClick={() => createPlaylist(0)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>

          <ul>
            {playlists.map((playlist) => {
              return (
                <Playlist
                  playlist={playlist}
                  remove={remove}
                  removeItem={removeItem}
                  setActive={setActive}
                  current={current}
                  rename={rename}
                  updateName={updateName}
                  title={title}
                  userTime={userTime}
                />
              );
            })}
          </ul>
        </div>
      </>
    );
	}
}

