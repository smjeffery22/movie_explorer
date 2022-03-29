import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './hero/Hero';
import MovieSlider from './movie_slider/MovieSlider';
import './HomePage.scss';

const HomePage = () => {
	const [trendingDay, setTrendingDay] = useState([]);
	const [trendingWeek, setTrendingWeek] = useState([]);

	useEffect(() => {
		fetchTrending('day');
		fetchTrending('week');
	}, []);

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
		<div className="home">
			<Hero />
			<MovieSlider title="Trending Today" movies={trendingDay} />
			<MovieSlider title="Trending This Week" movies={trendingWeek} />
		</div>
	);
};

export default HomePage;
