import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
	// const [pathname, setPathname] = useState('/');
	const location = useLocation();

	return (
		<div className="navbar">
			<div className="navbar-container">
				<div className="navbar-left">
					<Link to="/" className="navbar-item">
						MovieExplorer
					</Link>
					<Link
						to="/popular"
						className={
							location.pathname === '/popular' ? 'navbar-item active' : 'navbar-item'
						}
					>
						Popular
					</Link>
					<Link
						to="/now-playing"
						className={
							location.pathname === '/now-playing' ? 'navbar-item active' : 'navbar-item'
						}
					>
						Now Playing
					</Link>
					<Link
						to="/upcoming"
						className={
							location.pathname === '/upcoming' ? 'navbar-item active' : 'navbar-item'
						}
					>
						Upcoming
					</Link>
					<Link
						to="/top-rated"
						className={
							location.pathname === '/top-rated' ? 'navbar-item active' : 'navbar-item'
						}
					>
						Top Rated
					</Link>
				</div>
				<div className="navbar-right">Search</div>
			</div>
		</div>
	);
};

export default Navbar;
