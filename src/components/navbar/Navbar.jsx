import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

const Navbar = ({ searchValue, handleSearchValue }) => {
	const location = useLocation();

	return (
		<div className="navbar">
			<div className="navbar-container">
				<div className="navbar-left">
					<Link to="/" className="navbar-menu">
						MovieExplorer
					</Link>
					<Link
						to="/popular"
						className={
							location.pathname === '/popular'
								? 'navbar-menu active'
								: 'navbar-menu'
						}
					>
						Popular
					</Link>
					<Link
						to="/now-playing"
						className={
							location.pathname === '/now-playing'
								? 'navbar-menu active'
								: 'navbar-menu'
						}
					>
						Now Playing
					</Link>
					<Link
						to="/upcoming"
						className={
							location.pathname === '/upcoming'
								? 'navbar-menu active'
								: 'navbar-menu'
						}
					>
						Upcoming
					</Link>
					<Link
						to="/top-rated"
						className={
							location.pathname === '/top-rated'
								? 'navbar-menu active'
								: 'navbar-menu'
						}
					>
						Top Rated
					</Link>
				</div>
				<div className="navbar-right">
					<input
						className="navbar-search"
						type="text"
						placeholder="Search movie..."
						onChange={(e) => handleSearchValue(e.target.value)}
					/>
					<span>
						<FaSearch className="navbar-search-icon" />
					</span>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
