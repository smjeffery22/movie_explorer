import { useState } from 'react';
import Button from '../../button/Button';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import MovieModal from '../../modal/MovieModal';
import './Hero.scss';

const Hero = ({ heroMovie }) => {
	const [playTrailer, setPlayTrailer] = useState(false);
	const [showInfo, setShowInfo] = useState(false);

	// set background of the hero container
	const backgroundStyle = {
		background: `linear-gradient(rgba(20,20,20,0.2), rgba(20,20,20,0.2)), url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
		backgroundSize: '100% 100%',
		backgroundRepeat: 'no-repeat',
	};

	// shorten overview to 30 words if over 30 words
	const shortenOverview = (overview) => {
		return overview.split(' ').length > 30
			? `${overview.split(' ').slice(0, 30).join(' ')} ...`
			: overview;
	};

	const close = () => setShowInfo(false);

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
						onClick={() => setShowInfo(true)}
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
				{showInfo && (
					<MovieModal movie={heroMovie} modalOpen={showInfo} handleClose={close} />
				)}
			</AnimatePresence>
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
