import React, { Component } from 'react';
import Form from '../Form/Form';
import './index.css';
import logo from './logo.png';

import LoadingBar from '../LoadingBar/LoadingBar'

class Header extends Component {
	render() {
		const { setUserTime, userTime, selectGenre, genres, handleSubmit, loading } = this.props;

		return (
			<header>

				<nav className="navBar">
					{/* <p>Podcast Planner</p> */}
				</nav>

				<div className="flexContainer wrapper">
					{/* <div className="containerOne">
						<img src={logo} className="logo" />
					</div> */}
					<div className="containerTwo">
						<div class="logo-container">
							<img src={logo} className="logo"/>
							<h1>Podcast Planner</h1>
						</div>
						<p>Welcome to the Podcast Planner! Whether you're walking, hiking, road tripping or just plain hanging out, use this app to select podcast durations based on your journey time and create playlists!</p>
					</div>
					<div className="containerThree">
						<Form
							setUserTime={setUserTime}
							userTime={userTime}
							selectGenre={selectGenre}
							genres={genres}
							handleSubmit={handleSubmit}
						/>
					</div>
				</div>

				<LoadingBar loading={loading} />
				<div className="shape"></div>
			</header>
		)
	}
}

export default Header; 