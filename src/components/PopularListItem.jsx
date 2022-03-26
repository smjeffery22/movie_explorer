import React from 'react';
import './PopularListItem.scss';

const PopularListItem = ({ movie }) => {
	return (
		<div className="movie-item">
      <div className="movie-item-card">
        <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="" />
			  <h3>{movie.title}</h3>
        </div>
		</div>
	);
};

export default PopularListItem;
