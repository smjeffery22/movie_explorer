import { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";

import Button from '../button/Button';
import Backdrop from '../backdrop/Backdrop';
import './MovieModal.scss';
import { type } from '@testing-library/user-event/dist/type';

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

const MovieModal = ({ movie, handleClose }) => {
	const [details, setDetails] = useState({});
	const [casts, setCasts] = useState([]);
	const [crews, setCrews] = useState([]);
	const [playTrailer, setPlayTrailer] = useState(false);

	useEffect(() => {
		fetchDetails();
		fetchCredits();
	}, []);

	// fetch movie details from api (includes videos)
	const fetchDetails = async () => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = `/movie/${movie.id}`;
		const details = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos`
		);

		setDetails(details.data); // move details data in object
	};

	// fetch movie credits from api
	const fetchCredits = async () => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = `/movie/${movie.id}/credits`;
		const credits = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		setCasts(credits.data.cast);
		setCrews(credits.data.crew);
	};

	// convert total runtime from minute to hour and minute
	const convertRuntime = () => {
		const totalRuntime = details.runtime;
		const hour = Math.floor(totalRuntime / 60);
		const mins = totalRuntime - hour * 60;

		return `${hour} h ${mins} m`;
	};

	// get name of the movie director
	const getDirector = () => {
		let directorName = '';

		crews.forEach((crew) => {
			if (crew.job === 'Director') {
				directorName = crew.name;
			}
		});

		return directorName;
	};

	// get first 5 cast members of the movie
	const getCasts = () => {
		const fiveCasts = [];

		for (let i = 0; i < 5; i++) {
			fiveCasts.push(casts[i]['name']);
		}

		return fiveCasts.join(', ');
	};

	// get movie trailer
	const getTrailer = () => {
		const trailer = details.videos.results.find(
			(video) => video.name.includes('Official Trailer')
		);

		if (trailer) {
			return (
				<div className="modal-movie-detail-trailer">
					{/* <Button close="button-close">X</Button> */}
					<YouTube
						containerClassName="trailer-youtube"
						videoId={trailer.key}
						opts={{
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
			);
		} else {
			return (
				<div className="modal-movie-detail-trailer">
					{/* <Button close="button-close" onClick={() => console.log('Close')}>X</Button> */}
					<h1 className="no-trailer">Sorry, no trailer available...</h1>
				</div>
			);
		}
	};

	// set background of the modal to movie poster
	const backgroundStyle = {
		background: `linear-gradient(rgba(20,20,20,0.5), rgba(20,20,20,0.5)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
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
				<div className="modal-movie-detail-container">
					<h1 className="modal-movie-detail-heading">
						<div>
							<span>{movie.title}</span>
							<span>({movie.release_date.slice(0, 4)})</span>
						</div>
						<div className="modal-movie-detail-trailer-button">
							<Button
								trailer="button-trailer"
								onClick={() => setPlayTrailer(true)}
							>
								<FaPlay className="play-button" /> Watch Trailer
							</Button>
						</div>
					</h1>
					<div className="modal-movie-detail-subheading">
						<span>{movie.release_date}</span>
						<span>
							<strong>&#183;</strong>
						</span>
						{Object.keys(details).length !== 0 &&
							details.genres.map((genre) => {
								return <span>{genre.name}</span>;
							})}
						<span>
							<strong>&#183;</strong>
						</span>
						{details.runtime < 60 && <span>{details.runtime}</span>}
						{details.runtime > 60 && <span>{convertRuntime()}</span>}
					</div>
					<div className="modal-movie-detail-people">
						<div className="modal-movie-detail-director">
							<strong>Director:</strong> {crews.length > 0 && getDirector()}
						</div>
						<div className="modal-movie-detail-casts">
							<strong>Casts:</strong> {casts.length > 0 && getCasts()}
						</div>
					</div>
					<div className="modal-movie-detail-overview">
						<div>Overview</div>
						<p>{movie.overview}</p>
					</div>
				</div>
			</motion.div>
			{details.videos && playTrailer ? getTrailer() : null}
		</Backdrop>
	);
};

export default MovieModal;
