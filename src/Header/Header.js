import React, { Component } from 'react';
import Form from '../Form/Form';
import "./index.css";

import LoadingBar from '../LoadingBar/LoadingBar'

class Header extends Component {
    render() {
			const { setUserTime, userTime, selectGenre, genres, handleSubmit, loading } = this.props;

        return (
            <header>
                <nav className="navBar"></nav>
                <div className="flexContainer wrapper">
                    <div className="containerOne">
                        <h1>Podcast Planner</h1>
                        <p>Welcome to the Podcast Planner! Whether you're walking, hiking, road tripping or just plain hanging out, use this app to select podcast durations based on your journey time and create playlists!</p>
                    </div>
                    <div className="containerTwo">
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