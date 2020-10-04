import React from 'react'
import './index.css'

export default function Podcast(props) {
	const { podcasts, add } = props;

	

  const getPodcastInfo = (podcast) => {
    const { audio_length_sec, id, title_original, description_original, thumbnail } = podcast;
    const podcastTitle = podcast.podcast.title_original;
    const duration = Math.round(
		  parseInt(audio_length_sec / 60)
    );
	  const description = description_original;

    let shortDescription = description.split(' ').slice(0, 20).join(' ');
    shortDescription += '...';
    
    return (<li className="podcast">
      <h2>{podcastTitle}</h2>
      <img src={thumbnail} alt='' />
      <h3>{title_original}</h3>
      <p>{shortDescription}</p>
      <p>Length: {duration} minutes</p>
      <button onClick={() => add(podcast)}>Add To Playlist</button>
    </li> )
  }

	return (
    <div className="wrapper">
      <h2>Your Podcast Selections!</h2>
      <ul className="podcastList">
        {podcasts.map((podcast) => {
          return getPodcastInfo(podcast);
        })}
      </ul>
    </div>
	)
}
