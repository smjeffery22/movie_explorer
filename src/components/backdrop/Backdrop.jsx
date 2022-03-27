import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './Backdrop.scss';

const Backdrop = ({ children, onClick }) => {
	return (
		<motion.div
			className="backdrop"
			onClick={onClick}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{children}
		</motion.div>
	);
};

export default Backdrop;
