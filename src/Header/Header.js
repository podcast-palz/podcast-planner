import React, { Component } from 'react';
import Form from '../Form/Form';
import './index.css';
// import logo from './logo1.png';

class Header extends Component {
    render() {
        return (
            <header>
                <nav className="navBar"></nav>
                {/* <img src={logo} className="logo"/> */}
                <div className="flexContainer wrapper">
                    <div className="containerOne">
                        <h1>Podcast Planner</h1>
                        <p>Welcome to the Podcast Planner! Whether you're walking, hiking, road tripping or just plain hanging out, use this app to select podcast durations based on your journey time and create playlists!</p>
                    </div>
                    <div className="containerTwo">
                        <Form 
                            setUserTime={this.props.setUserTime}
                            userTime={this.props.userTime}
                            selectGenre={this.props.selectGenre}
                            genres={this.props.genres}
                            handleSubmit={this.props.handleSubmit}
                        />
                    </div>
                </div>
                <div className="shape"></div>
            </header>
        )
    }
}

export default Header; 