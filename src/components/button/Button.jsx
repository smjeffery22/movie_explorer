import React from 'react';
import './Button.scss';

const Button = ({ name, genreId, genreName, setActiveGenre }) => {
	return (
		<div
			className="button-genre active"
			onClick={() => setActiveGenre(genreId)}
		>
			{genreName}
		</div>
	);
};

export default Button;
