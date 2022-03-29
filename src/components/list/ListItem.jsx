import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieModal from '../modal/MovieModal';
import './ListItem.scss';

const ListItem = ({ movie, upcoming }) => {
	const [modalOpen, setModalOpen] = useState(false);
	// const [details, setDetails] = useState({});

	// useEffect(() => {
	//   fetchDetails();
	// }, [modalOpen]);

	// // fetch movie details from api
	// const fetchDetails = async () => {
	// 	const baseUrl = 'https://api.themoviedb.org/3';
	// 	const path = `/movie/${movie.id}`;
	// 	const details = await axios.get(
	// 		`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
	// 	);

	// 	setDetails(details.data); // move details data in object
	// };

	const open = () => setModalOpen(true);
	const close = () => setModalOpen(false);
	console.log(movie.vote_average)
	const movieRatingColor = (rating) => {
		if (rating < 5) return 'movie-rating-low';
		if (5 <= rating && rating < 7) return 'movie-rating-average';
		if (7 <= rating && rating < 8.5) return 'movie-rating-good';
		if (8.5 <= rating) return 'movie-rating-high';
	};

	return (
		<AnimatePresence>
			<motion.div
				className="movie-item"
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 1.1 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				layout
				onClick={() => (modalOpen ? close() : open())}
			>
				<div className="movie-item-card">
					<img
						className="movie-poster"
						src={
							movie.poster_path
								? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
								: require('../../assets/no_image.png')
						}
						alt=""
					/>
					<div className="movie-info">
						<div className="movie-title">{movie.title}</div>
						{!upcoming && (
							<div className={movieRatingColor(movie.vote_average)}>
								{movie.vote_average.toFixed(1)}
							</div>
						)}
					</div>
				</div>
			</motion.div>

			<AnimatePresence
				initial={false}
				exitBeforeEnter={true}
				onExitComplete={() => null}
			>
				{modalOpen && (
					<MovieModal movie={movie} modalOpen={modalOpen} handleClose={close} />
				)}
			</AnimatePresence>
		</AnimatePresence>
	);
};

export default ListItem;
