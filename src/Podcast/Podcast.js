import React from 'react'
import './index.css'

export default function Podcast(props) {
	const { podcasts, add } = props;

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
    
    return (<li className="podcast">
      <h2>{podcastTitle}</h2>
      <img src={thumbnail} alt='' />
      <h3>{title_original}</h3>
      <p>{shortDescription}</p>
      <p>Length: {duration} minutes</p>
      <button onClick={() => add(podcast)}>Add To Playlist</button>
    </li> )
  }

  // podcasts.sort((a, b) => (sortType === 'asc') ? parseFloat(a.audio_length_sec) - parseFloat (b.audio_length_sec) : parseFloat(b.audio_length_sec) - parseFloat (a.audio_length_sec));

  // sorts through podcast audio length in ascending order
  podcasts.sort((a, b) => parseFloat(a.audio_length_sec) - parseFloat (b.audio_length_sec));

	return (
    <div>
      <h2 className="podcastHeading">Your Podcast Selections:</h2>
      <div className="wrapper">
        {/* <button onClick={() => this.onSort('asc')}>Sort by Ascending</button>
        <button onClick={() => this.onSort('asc')}>Sort by Descending</button> */}

        <ul className="podcastList">
          {podcasts.map((podcast) => {
            return getPodcastInfo(podcast);
          })}
        </ul>
      </div>
    </div>
	)
}
