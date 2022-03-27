import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieModal from '../modal/MovieModal';
import './PopularListItem.scss';

const PopularListItem = ({ movie }) => {
	const [modalOpen, setModalOpen] = useState(false);

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
				{modalOpen && <MovieModal modalOpen={modalOpen} handleClose={close} />}
			</AnimatePresence>
		</AnimatePresence>
	);
};

export default PopularListItem;
