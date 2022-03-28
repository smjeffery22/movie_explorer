import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/navbar/Navbar';
import PopularList from './components/list/popular/PopularList';
import NowPlaying from './components/list/now_playing/NowPlaying';
import './App.scss';

function App() {
	return (
		<Router>
			<div className="movie-wrap">
				<Navbar />
				<Routes>
					<Route path="/popular" element={<PopularList />} />
					<Route path="/now-playing" element={<NowPlaying />} />
					<Route path="/upcoming" element={<PopularList />} />
					<Route path="/top-rated" element={<PopularList />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
