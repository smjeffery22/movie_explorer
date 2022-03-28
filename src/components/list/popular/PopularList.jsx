import { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from '../ListItem';
import Filter from '../../filter/Filter';
import './PopularList.scss';

const PopularList = () => {
	const [popular, setPopular] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [genres, setGenres] = useState([]);
	const [activeGenre, setActiveGenre] = useState(0);

	useEffect(() => {
		fetchPopular();
		fetchGenres();
	}, []);

	// re-render when the value of activeGenre changes
	useEffect(() => {
		if (activeGenre === 0) return setFiltered(popular);

		// filter movies by genre
		const filteredByGenre = popular.filter((movie) => {
			return movie.genre_ids.includes(activeGenre);
		});

		setFiltered(filteredByGenre);
	}, [activeGenre]);

	// fetch popular movies from api
	const fetchPopular = async () => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = '/movie/popular';
		const popularMovies1 = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
		);
		const popularMovies2 = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`
		);
		
		// combine movie data returned from axios calls
		const movieData = [...popularMovies1.data.results, ...popularMovies2.data.results];
		const uniqueMovieIds = [];
		
		// filter out duplicate movies from the API data
		//	bug in API data
		const filteredPopularMovies = movieData.filter((movie) => {
			const isDuplicate = uniqueMovieIds.includes(movie.id);

			// push id if not already in uniqueMovieIds array
			if (!isDuplicate) {
				uniqueMovieIds.push(movie.id);

				// filter only adds an element to the return array for truthy value
				return true;
			}
		});

		setPopular(filteredPopularMovies);
		setFiltered(filteredPopularMovies);
	};

	// fetch movie genres data from api
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
			<Filter
				genres={genres}
				activeGenre={activeGenre}
				setActiveGenre={setActiveGenre}
				setFiltered={setFiltered}
			/>
			<div className="movie-list">
				{filtered.map((movie) => {
					return <ListItem key={movie.id} movie={movie} />;
				})}
			</div>
		</div>
	);
};

export default PopularList;
