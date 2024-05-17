import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';

const Carousal = ({data}) => {
    const navigate = useNavigate()
    return (
        <>
            <Swiper 
                navigation={true} 
                slidesPerView={2}
                spaceBetween={10}
                slidesPerGroup={2} // Add this line to move multiple slides per navigation click
                breakpoints={{
                    460: {
                        slidesPerView: 2.5,
                        spaceBetween: 20,
                        slidesPerGroup: 2
                      },
                    600: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                      slidesPerGroup: 3
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 40,
                      slidesPerGroup: 4
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 50,
                      slidesPerGroup: 5
                    },
                  }}
                modules={[Navigation]} 
                className="mySwiper"
            >
                {
                    data.map((movie) => (
                        <SwiperSlide>
                            <div className='relative bg-gray-950 rounded-2xl h-[250px] min-w-full'>
                                <img src={movie.poster} className='h-[250px] min-w-full' alt='Movie Poster'/>
                                <div className='absolute top-0 left-0 flex flex-col justify-between w-full h-full p-5 transition-all duration-300 bg-black bg-opacity-75 cursor-pointer lg:bg-opacity-0 lg:opacity-0 hover:opacity-100 hover:bg-opacity-75'>
                                    <div className='flex flex-col justify-start gap-1 text-start'>
                                        <h className='text-base font-bold text-white'>{movie.title}</h>
                                        <span className='text-sm font-semibold text-white'>{movie.genre}</span>
                                    </div>
                                    <div className='flex justify-end w-full'>
                                        <button onClick={() => navigate(`/movies/${movie._id}`)} className="px-5 text-xs p-2 font-semibold text-white transition-all duration-300 bg-black rounded hover:bg-gradient-to-t  from-red-500 to-black to-80%">See Details</button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}

export default Carousal;
