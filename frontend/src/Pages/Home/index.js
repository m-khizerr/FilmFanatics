import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay} from 'swiper/modules';
import Modal from '../../Components/AddMovieForm';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

import Carousal from '../../Components/Carousal';
import Cover from '../../Resources/Movies-Collection.jpg'


const Home = () => {

    const [movies, setMovies] = useState([]);
    const [sortedMovies, setSortedMovies] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/movie/getallmovies')
            setMovies(response.data.movies);
        } catch (error) {
            console.log(error.message);
        }
    }

    const sortMovies = () => {
        const sortedMovies = movies.sort((a, b) => b.reviews.length - a.reviews.length);
        console.log(movies);
        return sortedMovies;
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        const sortedMovies = sortMovies();
        setSortedMovies(sortedMovies);
        console.log(sortedMovies);        
    }, [movies])

    const [showModal, setShowModal] = useState(false);

     return (
        <div className='relative min-h-screen pb-20 overflow-hidden bg-gray-900'>
            <div className='flex flex-col gap-10'>
                <div className='w-screen h-auto lg:h-screen relative'>
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
                            <SwiperSlide key={movie.id}>
                                {/* Your slide content */}
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
                    {/* Absolute positioned button */}
                    <button onClick={() => setShowModal(true)} className="bottom-5 right-5 fixed bg-red-500 z-50 text-white py-4 px-4 rounded-full">Add</button>
                    <Modal showModal={showModal} setShowModal={setShowModal} />
                </div>
                <div className='w-screen px-10 flex flex-col gap-5 text-start text-white'>
                    <h className='text-xl font-bold'>Most Reviews</h>
                    <Carousal data={movies}/>
                </div>
            </div>
        </div>
    );
}

export default Home;