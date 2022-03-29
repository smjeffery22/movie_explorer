import React from 'react';
import YouTube from 'react-youtube';
import './Hero.scss';

const Hero = ({ heroMovie }) => {
	console.log('hero:', heroMovie);
	return (
		<div
			className="hero"
			style={{
				backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
			}}
		>
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
