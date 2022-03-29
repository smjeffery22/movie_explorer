import React from 'react';
import Hero from './hero/Hero';
import HomeList from './home_list/HomeList';
import './HomePage.scss';

const HomePage = () => {
	return (
		<div className="home">
			<Hero />
			<HomeList />
		</div>
	);
};

export default HomePage;
