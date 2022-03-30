import { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from '../ListItem';
import Filter from '../../filter/Filter';
import './SearchList.scss';

const SearchList = ({ searchedMovies }) => {

	return (
		<div className="movie-container">
			<div className="movie-list">
				{searchedMovies.map((movie) => {
					return <ListItem key={movie.id} movie={movie} />;
				})}
			</div>
		</div>
	);
};

export default SearchList;
