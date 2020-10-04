import React from 'react';
import "./index.css";
// import "../Header/index.css";

export default function Form(props) {
	const { setUserTime, userTime, selectGenre, genres, handleSubmit } = props;

	return (
		<form action="submit" className="form">
			{/* time slider */}
			<label htmlFor="time">Select Podcast Duration</label>
			<input
				onChange={setUserTime}
				type="range"
				name="time"
				id="time"
				min="0"
				max="120"
				value={userTime}
			/>
			{/* display time selected */}
			<span>{userTime} minute(s)</span>

			{/* genre select */}
			<label htmlFor="genre"></label>
			
			<select onChange={selectGenre} name="genre" id="genre">
				<option value="">Select Genre ⬇</option>
				{genres.map((genre) => {
					return (
						<option className="options" key={genre.id} value={genre.id}>
							{genre.name}
						</option>
					);
				})}
			</select>
			
			<button onClick={handleSubmit} type="submit" className="headerButton">
				Submit
          </button>
		</form>
	)
}
