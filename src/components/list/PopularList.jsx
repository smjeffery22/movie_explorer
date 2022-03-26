import { useState, useEffect } from 'react';
import axios from 'axios';
import PopularListItem from './PopularListItem';
import Filter from '../filter/Filter';
import './PopularList.scss';

const PopularList = () => {
	const [popular, setPopular] = useState([]);

	useEffect(() => {
		fetchPopular();
		console.log(popular);
	}, []);

	const fetchPopular = async () => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = '/movie/popular';
		const popularMovies = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
		);
		setPopular(popularMovies.data.results);
	};

	return (
		<div className="movie-container">
			<Filter />
			<div className="movie-list">
				{popular.map((movie) => {
					return <PopularListItem key={movie.id} movie={movie} />;
				})}
			</div>
		</div>
	);
};

export default PopularList;
