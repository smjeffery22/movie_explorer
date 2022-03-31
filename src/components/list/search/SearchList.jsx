import ListItem from '../ListItem';
import './SearchList.scss';

const SearchList = ({ searchedMovies }) => {
	console.log(searchedMovies);
	return (
		<div className="movie-container">
			<div className="movie-list">
				{searchedMovies.length > 0 &&
					searchedMovies.map((movie) => {
						return <ListItem key={movie.id} movie={movie} />;
					})}
			</div>
		</div>
	);
};

export default SearchList;
