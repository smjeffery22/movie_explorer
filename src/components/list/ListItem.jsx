import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import MovieModal from '../modal/MovieModal';
import './ListItem.scss';

const ListItem = ({ movie }) => {
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
						src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
						alt=""
					/>
					<div className="movie-info">
						<div className="movie-title">{movie.title}</div>
						<div className="movie-rating">{movie.vote_average}</div>
					</div>
				</div>
			</motion.div>

			<AnimatePresence
				initial={false}
				exitBeforeEnter={true}
				onExitComplete={() => null}
			>
				{modalOpen && <MovieModal movie={movie} modalOpen={modalOpen} handleClose={close} />}
			</AnimatePresence>
		</AnimatePresence>
	);
};

export default ListItem;
