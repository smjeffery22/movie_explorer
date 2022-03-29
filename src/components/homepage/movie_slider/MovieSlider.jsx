import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './MovieSlider.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';

const MovieSlider = ({ title, movies }) => {
	return (
		<div className="slider">
			<div className="slider-title">{title}</div>
			<div className="slider-container">
				<Swiper
					slidesPerView={5}
					spaceBetween={30}
					slidesPerGroup={5}
					loop={false}
					loopFillGroupWithBlank={true}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
				>
					{movies.map((movie) => {
						return (
							<SwiperSlide>
								<img
									key={movie.id}
									className="slider-poster"
									src={
										movie.poster_path
											? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
											: require('../../../assets/no_image.png')
									}
									alt=""
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};

export default MovieSlider;
