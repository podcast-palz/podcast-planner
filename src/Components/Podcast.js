import React from 'react'

export default function Podcast(props) {
	const { podcast, add } = props;
	const { audio_length_sec, id, title_original, description_highlighted } = podcast;
	
	const duration = Math.round(
		parseInt(audio_length_sec / 60)
	);
	
	return (
			<div key={id} className="podcast">
				<h2>{title_original}</h2>
				<p>{description_highlighted}</p>
				<p>{duration} minutes</p>
				<button onClick={() => add(podcast)}>Add To Playlist</button>
			</div>
	)
}
