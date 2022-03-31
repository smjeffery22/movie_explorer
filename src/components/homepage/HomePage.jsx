import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './hero/Hero';
import MovieSlider from './movie_slider/MovieSlider';
import './HomePage.scss';

const HomePage = ({ searchValue }) => {
	const [heroMovie, setHeroMovie] = useState({});
	const [trendingDay, setTrendingDay] = useState([]);
	const [trendingWeek, setTrendingWeek] = useState([]);
	const [recommended, setRecommended] = useState([]);
	const [random, setRandom] = useState([]);

	useEffect(() => {
		fetchTrending('day');
		fetchTrending('week');
		fetchRandomTopRated();
	}, []);

	// fetch one random top rated movie (+ recommendations and similar movies) from api
	const fetchRandomTopRated = async () => {
		const randomNumber19 = Math.floor(Math.random() * 19);
		const randomNumber100 = Math.floor(Math.random() * 100) + 1;
		const baseUrl = 'https://api.themoviedb.org/3';
		const pathTopRated = '/movie/top_rated';
		const randomTopRatedMovieData = await axios.get(
			`${baseUrl}${pathTopRated}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${randomNumber100}`
		);
		const randomTopRatedMovie = await randomTopRatedMovieData.data.results[
			randomNumber19
		];

		// fetch recommendations and similar movies from the top rated movie fetched above
		const pathDetails = `/movie/${randomTopRatedMovie.id}`;
		const detailsMovieData = await axios.get(
			`${baseUrl}${pathDetails}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=recommendations,similar`
		);

		console.log(randomTopRatedMovie);
		console.log(detailsMovieData);
		setHeroMovie(randomTopRatedMovie);
		setRecommended(detailsMovieData.data.recommendations.results);
		setRandom(detailsMovieData.data.similar.results);
	};

	// fetch daily/weekly trending movies from api
	const fetchTrending = async (timeWindow) => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = `/trending/movie/${timeWindow}`;
		const trendingMovies = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}`
		);

		timeWindow === 'day' && setTrendingDay(trendingMovies.data.results);
		timeWindow === 'week' && setTrendingWeek(trendingMovies.data.results);
	};

	return (
		<>
			{searchValue === '' && (
				<div className="home">
					<Hero heroMovie={heroMovie} />
					<MovieSlider title="Trending Today" movies={trendingDay} />
					<MovieSlider title="Trending This Week" movies={trendingWeek} />
					<MovieSlider title="Recommendations" movies={recommended} />
					<MovieSlider title="Random" movies={random} />
				</div>
			)}
		</>
	);
};

export default HomePage;
