import React, { useEffect } from 'react';
import Button from '../button/Button';
import './Filter.scss';

const Filter = ({ genres, activeGenre, setActiveGenre }) => {
	return (
		<div className="movie-genre">
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
