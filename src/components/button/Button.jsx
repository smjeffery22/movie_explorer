import React from 'react';
import './Button.scss';

const Button = ({ genreId, children, activeGenre, onClick }) => {
	return (
		<div
			className={`button-genre ${activeGenre === genreId ? 'active' : ''}`}
			// onClick={() => setActiveGenre(genreId)}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Button;
