import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './MovieSlider.scss';
import 'swiper/css';

const MovieSlider = ({ title, movies }) => {
	return (
		<div className="slider">
			<div className="slider-title">{title}</div>
			<div className="slider-container">
				<Swiper spaceBetween={10} slidesPerView={6}>
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
