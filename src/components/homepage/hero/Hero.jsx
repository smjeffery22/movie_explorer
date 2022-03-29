import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../button/Button';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import MovieModal from '../../modal/MovieModal';
import './Hero.scss';

const Hero = ({ heroMovie }) => {
	const [details, setDetails] = useState({});
	const [playTrailer, setPlayTrailer] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		fetchDetails();
	}, [heroMovie]);
	console.log(playTrailer, details);

	const close = () => setModalOpen(false);

	// fetch movie details from api (includes videos)
	const fetchDetails = async () => {
		const baseUrl = 'https://api.themoviedb.org/3';
		const path = `/movie/${heroMovie.id}`;
		const details = await axios.get(
			`${baseUrl}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos`
		);

		setDetails(details.data); // move details data in object
	};

	// shorten overview to 30 words if over 30 words
	const shortenOverview = (overview) => {
		return overview.split(' ').length > 30
			? `${overview.split(' ').slice(0, 30).join(' ')} ...`
			: overview;
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
				<div className="hero-movie-trailer">
					{/* <Button close="button-close">X</Button> */}
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
				</div>
			);
		} else {
			return (
				<div className="hero-movie-trailer">
					{/* <Button close="button-close" onClick={() => console.log('Close')}>X</Button> */}
					<h1 className="no-trailer">Sorry, no trailer available...</h1>
				</div>
			);
		}
	};

	// set background of the hero container
	const backgroundStyle = {
		background: `linear-gradient(rgba(20,20,20,0.2), rgba(20,20,20,0.2)), url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
		backgroundSize: '100% 100%',
		backgroundRepeat: 'no-repeat',
	};

	return (
		<div className="hero" style={heroMovie.backdrop_path && backgroundStyle}>
			<div className="hero-info">
				<div className="hero-title">{heroMovie.title && heroMovie.title}</div>
				<div className="hero-overview">
					{heroMovie.overview && shortenOverview(heroMovie.overview)}
				</div>
				<div className="hero-buttons">
					<Button
						heroButtonTrailer="button-hero-trailer"
						onClick={() => setPlayTrailer(true)}
					>
						<FaPlay className="play-button" />
						Watch Trailer
					</Button>
					<Button
						heroButtonInfo="button-hero-info"
						onClick={() => setModalOpen(true)}
					>
						<FaInfoCircle className="info" /> More Info
					</Button>
				</div>
			</div>
			<AnimatePresence
				initial={false}
				exitBeforeEnter={true}
				onExitComplete={() => null}
			>
				{modalOpen && (
					<MovieModal
						movie={heroMovie}
						modalOpen={modalOpen}
						handleClose={close}
					/>
				)}
			</AnimatePresence>
			{details.videos && playTrailer ? getTrailer() : null}

			{/* <iframe
				src="https://www.youtube.com/embed/3U7KaI_NPGg?&autoplay=1&mute=1"
				frameborder="0"
				allow="autoplay; encrypted-media"
				allowfullscreen
				title="video"
				width="100%"
				height="100%"
			/> */}
			{/* <YouTube
				containerClassName="trailer-youtube"
				videoId="3U7KaI_NPGg"
				opts={{
					width: '100%',
					height: '100%',
					playerVars: {
						// https://developers.google.com/youtube/player_parameters
						autoplay: 1,
						muted: 1,
					},
				}}
			/> */}
			{/* {heroMovie.poster_path && (
				<img
					src={`https://image.tmdb.org/t/p/original${heroMovie.poster_path}`}
					alt=""
				/>
			)} */}
		</div>
	);
};

export default Hero;
