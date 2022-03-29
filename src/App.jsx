import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/navbar/Navbar';
import PopularList from './components/list/popular/PopularList';
import NowPlaying from './components/list/now_playing/NowPlaying';
import Upcoming from './components/list/upcoming/Upcoming';
import TopRated from './components/list/top_rated/TopRated';
import './App.scss';

function App() {
	return (
		<Router>
			<div className="movie-wrap">
				<Navbar />
				<Routes>
					<Route path="/popular" element={<PopularList />} />
					<Route path="/now-playing" element={<NowPlaying />} />
					<Route path="/upcoming" element={<Upcoming />} />
					<Route path="/top-rated" element={<TopRated />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
