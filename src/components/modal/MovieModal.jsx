import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Backdrop from '../backdrop/Backdrop';
import './MovieModal.scss';

const dropIn = {
	hidden: {
		y: '-100vh',
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		// transition: {
		// 	duration: 0.1,
		// 	type: 'spring',
		// 	damping: 50,
		// 	stiffness: 250,
		// },
	},
	exit: {
		y: '100vh',
		opacity: 0,
	},
};

const MovieModal = ({ handleClose, text }) => {
	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				className="modal"
				onClick={(e) => e.stopPropagation()}
				// variants={dropIn}
				// initial="hidden"
				// animate="visible"
				// exit="exit"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
			>
				<p>Hello</p>
				<button onClick={handleClose}>Close</button>
			</motion.div>
		</Backdrop>
	);
};

export default MovieModal;
