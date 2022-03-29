import React from 'react';
import './MovieSlider.scss';

const MovieSlider = ({ title, movies }) => {
	return (
		<div className="slider">
			<div className="slider-title">{title}</div>
			<div className="slider-container">
				{movies.map((movie) => {
					return (
							<img
								key={movie.id}
								className="slider-poster"
								src={
									movie.poster_path
										? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
										: require('../../../assets/no_image.png')
								}
								alt=""
							/>
					);
				})}
			</div>
		</div>
	);
};

export default MovieSlider;
