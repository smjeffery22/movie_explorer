import React from 'react';
import Button from '../button/Button';
import './Filter.scss';

const Filter = ({ genres }) => {
	console.log(genres);
	return (
		<div className="movie-genre">
			{genres.map((genre) => {
				return <Button name={genre.name} />;
			})}
		</div>
	);
};

export default Filter;
