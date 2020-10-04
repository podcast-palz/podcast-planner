import React from 'react'

export default function Podcast(props) {
	const { podcast, add } = props;
	const { audio_length_sec, id, title_original, description_original } = podcast;
	
	const duration = Math.round(
		parseInt(audio_length_sec / 60)
  );


	const description = description_original;
	
	let shortDescription = description.split(' ').slice(0, 20).join(' ');
  shortDescription += '...';
  console.log(shortDescription);


	return (
			<li key={id} className="podcast">
				<h2>{title_original}</h2>
				<p>{shortDescription}</p>
				<p>{duration} minutes</p>
				<button onClick={() => add(podcast)}>Add To Playlist</button>
			</li>
	)
}
