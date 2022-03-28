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
}) => {
	return (
		<div
			className={`${genre} ${
				activeGenre === genreId && 'active'
			} ${trailer} ${close}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Button;
