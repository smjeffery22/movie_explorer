import React from 'react';
import './Button.scss';

const Button = ({
	genre,
	genreId,
	children,
	activeGenre,
	onClick,
	trailer,
	close,
	heroButtonTrailer,
	heroButtonInfo,
}) => {
	return (
		<div
			className={`${genre} ${
				activeGenre === genreId && 'active'
			} ${trailer} ${close} ${heroButtonTrailer} ${heroButtonInfo}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Button;
