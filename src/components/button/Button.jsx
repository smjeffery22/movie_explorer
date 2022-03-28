import React from 'react';
import './Button.scss';

const Button = ({ genre, genreId, children, activeGenre, onClick, trailer }) => {
	return (
		<div
			className={`${genre} ${activeGenre === genreId && 'active'} ${trailer}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Button;
