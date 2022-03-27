import React from 'react';
import './Button.scss';

const Button = ({ genreId, genreName, activeGenre, setActiveGenre }) => {
	return (
		<div
			className={`button-genre ${activeGenre === genreId ? 'active' : ''}`}
			onClick={() => setActiveGenre(genreId)}
		>
			{genreName}
		</div>
	);
};

export default Button;
