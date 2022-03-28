import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
	return (
		<div className="navbar">
			<div className="navbar-container">
				<div className="navbar-left">
					<Link to="/">MovieExplorer</Link>
					<Link to="/popular">Popular</Link>
					<Link to="/now-playing">Now Playing</Link>
					<Link to="/upcoming">Upcoming</Link>
					<Link to="/top-rated">Top Rated</Link>
				</div>
				<div className="navbar-right">Search</div>
			</div>
		</div>
	);
};

export default Navbar;
