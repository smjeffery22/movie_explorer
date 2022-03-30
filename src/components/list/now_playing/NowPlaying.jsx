import { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from '../ListItem';
import Filter from '../../filter/Filter';
import './NowPlaying.scss';

const NowPlaying = ({ searchValue }) => {
	const [nowPlaying, setNowPlaying] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [genres, setGenres] = useState([]);
	const [activeGenre, setActiveGenre] = useState(0);

	useEffect(() => {
		fetchNowPlayinig();
		fetchGenres();
	}, []);

	// re-render when the value of activeGenre changes
	useEffect(() => {
		if (activeGenre === 0) return setFiltered(nowPlaying);

		// filter movies by genre
		const filteredByGenre = nowPlaying.filter((movie) => {
			return movie.genre_ids.includes(activeGenre);
		});

		setFiltered(filteredByGenre);
	}, [activeGenre]);

	// fetch now playing movies from api
	const fetchNowPlayinig = async () => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = '/movie/now_playing';
		const nowPlayingMovies1 = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
		);
		const nowPlayingMovies2 = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`
		);

		// combine movie data returned from axios calls
		const movieData = [
			...nowPlayingMovies1.data.results,
			...nowPlayingMovies2.data.results,
		];
		const uniqueMovieIds = [];

		// filter out duplicate movies from the API data
		//	bug in API data
		const filteredNowPlayingMovies = movieData.filter((movie) => {
			const isDuplicate = uniqueMovieIds.includes(movie.id);

			// push id if not already in uniqueMovieIds array
			if (!isDuplicate) {
				uniqueMovieIds.push(movie.id);

				// filter only adds an element to the return array for truthy value
				return true;
			}
		});

		setNowPlaying(filteredNowPlayingMovies);
		setFiltered(filteredNowPlayingMovies);
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
							return <ListItem key={movie.id} movie={movie} />;
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default NowPlaying;
