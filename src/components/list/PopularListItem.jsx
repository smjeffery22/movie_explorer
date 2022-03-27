import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PopularListItem.scss';

const PopularListItem = ({ movie }) => {
	return (
		<AnimatePresence>
			<motion.div
				className="movie-item"
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 1.1 }}
        animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
				layout
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
		</AnimatePresence>
	);
};

export default PopularListItem;
