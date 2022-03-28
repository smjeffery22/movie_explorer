import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/navbar/Navbar';
import PopularList from './components/list/PopularList';
import './App.scss';

function App() {
	return (
		<Router>
			<div className="movie-wrap">
				<Navbar />
				<Routes>
					<Route path="/popular" element={<PopularList />} />
					<Route path="/now-playimg" element={<PopularList />} />
					<Route path="/upcoming" element={<PopularList />} />
					<Route path="/top-rated" element={<PopularList />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
