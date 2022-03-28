import { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from '../ListItem';
import Filter from '../../filter/Filter';
import './NowPlaying.scss';



const NowPlaying = () => {
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
		const nowPlayingMovies = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
		);

		setNowPlaying(nowPlayingMovies.data.results);
		setFiltered(nowPlayingMovies.data.results);
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

export default NowPlaying;
