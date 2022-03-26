import React from 'react';
import './PopularListItem.scss';

const PopularListItem = ({ movie }) => {
	return (
		<div className="movie-item">
			<div className="movie-item-card">
				<img
					className="movie-poster"
					src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
					alt=""
				/>
				<div className="movie-info">
					<div className="movie-title">{movie.title}</div>
          <div className="movie-rating">{movie.vote_average}</div>
				</div>
			</div>
		</div>
	);
};

export default PopularListItem;
