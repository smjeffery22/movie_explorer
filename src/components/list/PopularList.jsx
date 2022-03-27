import { useState, useEffect } from 'react';
import axios from 'axios';
import PopularListItem from './PopularListItem';
import Filter from '../filter/Filter';
import './PopularList.scss';

const PopularList = () => {
	const [popular, setPopular] = useState([]);
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		fetchPopular();
		fetchGenres();
	}, []);

	const fetchPopular = async () => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = '/movie/popular';
		const popularMovies = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
		);

		setPopular(popularMovies.data.results);
	};

	const fetchGenres = async () => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = '/genre/movie/list';
		const genres = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		setGenres(genres.data.genres);
	};

	return (
		<div className="movie-container">
			<Filter genres={genres} />
			<div className="movie-list">
				{popular.map((movie) => {
					return <PopularListItem key={movie.id} movie={movie} />;
				})}
			</div>
		</div>
	);
};

export default PopularList;
