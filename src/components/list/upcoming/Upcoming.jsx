import { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from '../ListItem';
import Filter from '../../filter/Filter';
import './Upcoming.scss';

const NowPlaying = ({ searchValue }) => {
	const [upcoming, setUpcoming] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [genres, setGenres] = useState([]);
	const [activeGenre, setActiveGenre] = useState(0);

	useEffect(() => {
		fetchUpcoming();
		fetchGenres();
	}, []);

	// re-render when the value of activeGenre changes
	useEffect(() => {
		if (activeGenre === 0) return setFiltered(upcoming);

		// filter movies by genre
		const filteredByGenre = upcoming.filter((movie) => {
			return movie.genre_ids.includes(activeGenre);
		});

		setFiltered(filteredByGenre);
	}, [activeGenre]);

	// fetch upcoming movies from api
	const fetchUpcoming = async () => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = '/movie/upcoming';
		const upcomingMovies1 = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&region=US`
		);
		const upcomingMovies2 = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2&region=US`
		);

		// combine movie data returned from axios calls
		const movieData = [
			...upcomingMovies1.data.results,
			...upcomingMovies2.data.results,
		];
		const uniqueMovieIds = [];

		// filter out duplicate movies from the API data
		//	bug in API data
		const filteredUpcomingMovies = movieData.filter((movie) => {
			const isDuplicate = uniqueMovieIds.includes(movie.id);

			// push id if not already in uniqueMovieIds array
			if (!isDuplicate) {
				uniqueMovieIds.push(movie.id);

				// filter only adds an element to the return array for truthy value
				return true;
			}
		});

		setUpcoming(filteredUpcomingMovies);
		setFiltered(filteredUpcomingMovies);
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
		<>
			{searchValue === '' && (
				<div className="movie-container">
					<Filter
						genres={genres}
						activeGenre={activeGenre}
						setActiveGenre={setActiveGenre}
						setFiltered={setFiltered}
					/>
					<div className="movie-list">
						{filtered.map((movie) => {
							return <ListItem key={movie.id} movie={movie} upcoming />;
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default NowPlaying;
