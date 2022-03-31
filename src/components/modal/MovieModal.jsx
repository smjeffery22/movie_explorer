import { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaPlay } from 'react-icons/fa';

import Button from '../button/Button';
import Backdrop from '../backdrop/Backdrop';
import './MovieModal.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, FreeMode } from 'swiper';

const MovieModal = ({ movie, handleClose, noHover }) => {
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
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,similar`
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

		if (casts.length >= 5) {
			for (let i = 0; i < 5; i++) {
				fiveCasts.push(casts[i]['name']);
			}
		} else {
			for (let i = 0; i < casts.length; i++) {
				fiveCasts.push(casts[i]['name']);
			}
		}

		return fiveCasts.join(', ');
	};

	// get movie trailer
	const getTrailer = () => {
		const trailer = details.videos.results.find(
			(video) =>
				video.name.includes('Official Trailer') ||
				video.name.includes('Trailer')
		);

		if (trailer) {
			return (
				<div className="modal-movie-detail-trailer">
					<YouTube
						containerClassName="trailer-youtube"
						videoId={trailer.key}
						opts={{
							width: '100%',
							height: '100%',
							playerVars: {
								autoplay: 1,
							},
						}}
					/>
					<Button
						close="hero-movie-trailer-close button-close"
						onClick={() => setPlayTrailer(false)}
					>
						X
					</Button>
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
				style={movie.backdrop_path && backgroundStyle}
				onClick={(e) => e.stopPropagation()}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div className="modal-movie-detail-container">
					<div>
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
									return <span key={genre.id}>{genre.name}</span>;
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
					<div className="modal-movie-detail-similar">
						{Object.keys(details).length !== 0 && (
							<>
								<div className="similar-title">Similar Movies</div>
								<div className="slider-container">
									<Swiper
										slidesPerView={5.5}
										spaceBetween={20}
										freeMode={true}
										grabCursor={true}
										// pagination={{
										// 	clickable: true,
										// }}
										modules={[FreeMode, Pagination]}
										speed={1500}
										breakpoints={{
											// when window width is >= 1200px
											1200: {
												slidesPerView: 7.5,
												spaceBetween: 20,
											},

											// when window width is >= 1650px
											1650: {
												slidesPerView: 9.5,
												spaceBetween: 20,
											},
										}}
									>
										{details.similar.results.map((movie) => {
											return (
												<SwiperSlide className={noHover} key={movie.id}>
													<div className="slider-poster-container">
														<div className="slider-poster-wrapper">
															<img
																className="slider-poster"
																src={
																	movie.poster_path
																		? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
																		: require('../../assets/no_image.png')
																}
																alt=""
															/>
														</div>
														<div className="slider-poster-overlay">
															{movie.title}
														</div>
													</div>
												</SwiperSlide>
											);
										})}
									</Swiper>
								</div>
							</>
						)}
					</div>
				</div>
			</motion.div>
			{details.videos && playTrailer ? getTrailer() : null}
		</Backdrop>
	);
};

export default MovieModal;
