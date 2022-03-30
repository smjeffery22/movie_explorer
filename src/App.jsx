import { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import axios from 'axios';
import HomePage from './components/homepage/HomePage';
import Navbar from './components/navbar/Navbar';
import PopularList from './components/list/popular/PopularList';
import NowPlaying from './components/list/now_playing/NowPlaying';
import Upcoming from './components/list/upcoming/Upcoming';
import TopRated from './components/list/top_rated/TopRated';
import SearchList from './components/list/search/SearchList';
import './App.scss';

function App() {
	const [searchValue, setSearchValue] = useState('');
	const [searchedMovies, setSearchedMovies] = useState([]);

	useEffect(() => {
		searchValue !== '' && fetchSearchedMovies(searchValue);
	}, [searchValue]);

	const handleSearchValue = (search) => setSearchValue(search);

	// fetch searched movies from api
	const fetchSearchedMovies = async (search) => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = '/search/movie';
		const searched = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=1`
		);

		setSearchedMovies(searched.data.results);
	};

	return (
		<Router>
			<div className="movie-wrap">
				<Navbar
					searchValue={searchValue}
					handleSearchValue={handleSearchValue}
				/>
				<Routes>
					<Route path="/" element={<HomePage searchValue={searchValue} />} />
					<Route
						path="/popular"
						element={<PopularList searchValue={searchValue} />}
					/>
					<Route
						path="/now-playing"
						element={<NowPlaying searchValue={searchValue} />}
					/>
					<Route
						path="/upcoming"
						element={<Upcoming searchValue={searchValue} />}
					/>
					<Route
						path="/top-rated"
						element={<TopRated searchValue={searchValue} />}
					/>
				</Routes>
				{searchValue && <SearchList searchedMovies={searchedMovies} />}
			</div>
		</Router>
	);
}

export default App;
