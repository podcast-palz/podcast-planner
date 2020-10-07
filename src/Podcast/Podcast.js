import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

export default function Podcast(props) {
	const { podcasts, add, isStarted, sort } = props;

  /**
   * Generates information for the podcast episode to display on the page. 
   * @param {*} podcast 
   */
  const getPodcastInfo = (podcast) => {
    const { audio_length_sec, id, title_original, description_original, thumbnail } = podcast;
    const podcastTitle = podcast.podcast.title_original;
    const duration = Math.round(
		  parseInt(audio_length_sec / 60)
    );
	  const description = description_original;

    let shortDescription = description.split(' ').slice(0, 20).join(' ');
    shortDescription += '...';

    return (
      <>
          <h2>{podcastTitle}</h2>
        {/* <Link to={{ pathname: `/${this.props.testvalue}`, query: { backUrl } }} /> */}
        

        <Link 
        to={ {pathname: `/podcast/${podcast.id}`, query: {podcast: podcast}} }>
          <img src={thumbnail} alt='' />
        </Link>
          <h3>{title_original}</h3>
          <p>Length: {duration} minutes</p>
          <p>{shortDescription}</p>
         
          <button onClick={() => add(podcast)}>Add To Playlist</button>
      </>
    )
  }

	return (
    <div>
      <h2 className="podcastHeading">Your Podcast Selections:</h2>
      <div className="wrapper">
        {/* { !isStarted ? <h2 className="podcastHeading">Set your time and pick a genre to get started!</h2> :
        !podcasts.length ? <h2 className="podcastHeading">No podcasts found! Try searching for something else</h2> : */}
        <div className="sortContainer">
          <div className="childContainer">
            <p className="sortTitle">Sort by Podcast Length:</p>
          </div>
          <div className="childTwoContainer">
            <button className="sorting" onClick={() => sort('asc')}>Ascending ⬆</button>
            <button className="sorting" onClick={() => sort('desc')}>Descending ⬇</button>
          </div>
        </div>
        <>
          <ul className="podcastList">
              {podcasts.map((podcast) => {
                return (
                  <li className="podcast" key={podcast.id}> 
                    {getPodcastInfo(podcast)} 
                  </li> 
                )
              })}
            </ul>
        </>
      {/* } */}
      </div>
    </div>

	)
}
