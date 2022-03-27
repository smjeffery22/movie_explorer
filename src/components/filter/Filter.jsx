import React, { useEffect } from 'react';
import Button from '../button/Button';
import './Filter.scss';

const Filter = ({ genres, activeGenre, setActiveGenre }) => {
	return (
		<div className="movie-genre">
			<Button
				key={0}
				genreId={0}
				genreName="All"
				activeGenre={activeGenre}
				setActiveGenre={setActiveGenre}
			/>
			{genres.map((genre) => {
				return (
					<Button
						key={genre.id}
						genreId={genre.id}
						genreName={genre.name}
						activeGenre={activeGenre}
						setActiveGenre={setActiveGenre}
					/>
				);
			})}
		</div>
	);
};

export default Filter;
