import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Backdrop from '../backdrop/Backdrop';
import './MovieModal.scss';

// const dropIn = {
// 	hidden: {
// 		y: '-100vh',
// 		opacity: 0,
// 	},
// 	visible: {
// 		y: 0,
// 		opacity: 1,
// 		// transition: {
// 		// 	duration: 0.1,
// 		// 	type: 'spring',
// 		// 	damping: 50,
// 		// 	stiffness: 250,
// 		// },
// 	},
// 	exit: {
// 		y: '100vh',
// 		opacity: 0,
// 	},
// };

const MovieModal = ({ movie, handleClose, text }) => {
	// set background of the modal to movie poster
	const backgroundStyle = {
		background: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
		backgroundSize: '100% 100%',
	};

	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				className="modal"
				style={backgroundStyle}
				onClick={(e) => e.stopPropagation()}
				// variants={dropIn}
				// initial="hidden"
				// animate="visible"
				// exit="exit"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				{/* <img
					className="modal-movie-poster"
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
					alt=""
				/> */}
				<p>Hello</p>
				<button onClick={handleClose}>Close</button>
			</motion.div>
		</Backdrop>
	);
};

export default MovieModal;
