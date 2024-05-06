import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

import Carousal from '../../Components/Carousal';
import Cover from '../../Resources/Movies-Collection.jpg'


const Home = () => {

    const movies = [
        // {
        //     name: 'abc'
        // },
        // {
        //     name: 'abc'
        // }
    ];

     return (
        <div className='relative min-h-screen pb-20 overflow-hidden bg-gray-900 '>
            <div className='flex flex-col gap-10'>
                <div className='w-screen h-auto lg:h-screen'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                        delay: 2500,
                        duration: 2500,
                        disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {movies.length > 0 ? movies.map((movie) => (
                            <SwiperSlide>

                            </SwiperSlide>
                        )) :
                            <SwiperSlide>
                                <div className='relative w-full h-full'>
                                    <img src={Cover} className='object-cover w-full h-full' alt='Cover'/>
                                    <div className="absolute top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
                                        <div className="p-10 text-white lg:p-20">
                                            <h1 className="text-2xl font-extrabold text-red-500 lg:text-4xl sm:text-3xl">FILM FANATICS</h1>
                                            <p className="text-sm font-bold lg:text-xl sm:text-lg">Your Ultimate Destination for Cinematic Delight! <span className="text-red-500">Explore</span>, <span className="text-red-500">Discover</span>, and <span className="text-red-500">Dive</span> into the World of Movies with Us.</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        }
                    </Swiper>
                </div>
                <div className='w-screen h-[20vh] px-10'>
                    <Carousal />
                </div>
            </div>
        </div>
    );
}

export default Home;