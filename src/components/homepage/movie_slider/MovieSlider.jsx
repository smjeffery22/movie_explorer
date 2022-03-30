import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AnimatePresence } from 'framer-motion';
import MovieModal from '../../modal/MovieModal';
import './MovieSlider.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';

const MovieSlider = ({ title, movies }) => {
	const [modalOpen, setModalOpen] = useState(false);
	// sets the clicked movie as selected for opening movie modal
	const [selectedMovie, setSelectedMovie] = useState({});

	const close = () => setModalOpen(false);

	// set states when a movie is clicked from the slider
	const clickedMovie = (movie) => {
		setModalOpen(true);
		setSelectedMovie(movie);
	};

	return (
		<div className="slider">
			<div className="slider-title">{title}</div>
			<div className="slider-container">
				<Swiper
					slidesPerView={5}
					spaceBetween={20}
					slidesPerGroup={5}
					loop={false}
					loopFillGroupWithBlank={true}
					grabCursor={true}
					navigation={true}
					modules={[Navigation]}
					speed={1500}
					breakpoints={{
						// when window width is >= 1200px
						1200: {
							slidesPerView: 10,
							spaceBetween: 20,
							slidesPerGroup: 10,
						},
					}}
				>
					{movies.map((movie) => {
						return (
							<SwiperSlide key={movie.id} onClick={() => clickedMovie(movie)}>
								<img
									className="slider-poster"
									src={
										movie.poster_path
											? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
											: require('../../../assets/no_image.png')
									}
									alt=""
								/>
								<AnimatePresence
									initial={false}
									exitBeforeEnter={true}
									onExitComplete={() => null}
								></AnimatePresence>
							</SwiperSlide>
						);
					})}
				</Swiper>
				{modalOpen && selectedMovie && (
					<MovieModal movie={selectedMovie} modalOpen={modalOpen} handleClose={close} />
				)}
			</div>
		</div>
	);
};

export default MovieSlider;
