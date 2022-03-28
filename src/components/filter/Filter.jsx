import React, { useEffect } from 'react';
import Button from '../button/Button';
import './Filter.scss';

const Filter = ({ genres, activeGenre, setActiveGenre }) => {
	return (
		<div className="movie-genre">
			<Button
				key={0}
				genreId={0}
				children="All"
				activeGenre={activeGenre}
				// setActiveGenre={setActiveGenre}
				onClick={() => setActiveGenre(0)}
			/>
			{genres.map((genre) => {
				return (
					<Button
						key={genre.id}
						genreId={genre.id}
						children={genre.name}
						activeGenre={activeGenre}
						// setActiveGenre={setActiveGenre}
						onClick={() => setActiveGenre(genre.id)}
					/>
				);
			})}
		</div>
	);
};

export default Filter;
