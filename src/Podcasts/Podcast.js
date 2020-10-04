import React from 'react'
import './index.css'

export default function Podcast(props) {
	const { podcast, add } = props;
  const { audio_length_sec, id, title_original, description_original, thumbnail } = podcast;
  const podcastTitle = podcast.podcast.title_original;
  console.log(podcastTitle);
	
	const duration = Math.round(
		parseInt(audio_length_sec / 60)
  );

  console.log(podcast.podcast.title_original);
	const description = description_original;
	
	let shortDescription = description.split(' ').slice(0, 20).join(' ');
  shortDescription += '...';

	return (
			<li key={id} className="podcast">
        <h2>{podcastTitle}</h2>
        <img src={thumbnail} alt=''/>
				<h3>{title_original}</h3>
				<p>{shortDescription}</p>
				<p>Length: {duration} minutes</p>
				<button onClick={() => add(podcast)}>Add To Playlist</button>
			</li>
	)
}
