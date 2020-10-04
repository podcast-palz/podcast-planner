import React from 'react'

export default function Playlist(props) {
	const { playlist, remove } = props;
		
	return (
		<div className="playlist">
			<h3>Your playlist</h3>
			<ul>
				{playlist.map((item) => {
					return (
						<li key={item.key}>
							{item.data.title_original}
							<button onClick={() => remove(item.key)}>remove</button>
						</li>
					);
				})}
			</ul>
		</div>
	)
}
