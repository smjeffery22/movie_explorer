import React, { useEffect } from 'react';
import Button from '../button/Button';
import './Filter.scss';

const Filter = ({ genres, activeGenre, setActiveGenre }) => {
	return (
		<div className="movie-genre">
			<Button
				genre="button-genre"
				key={0}
				genreId={0}
				children="All"
				activeGenre={activeGenre}
				onClick={() => setActiveGenre(0)}
			/>
			{genres.map((genre) => {
				return (
					<Button
						genre="button-genre"
						key={genre.id}
						genreId={genre.id}
						children={genre.name}
						activeGenre={activeGenre}
						onClick={() => setActiveGenre(genre.id)}
					/>
				);
			})}
		</div>
	);
};

export default Filter;
