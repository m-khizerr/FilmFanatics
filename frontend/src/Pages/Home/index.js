import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination} from 'swiper/modules';
import Modal from '../../Components/AddMovieForm';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

import Carousal from '../../Components/Carousal';
import Cover from '../../Resources/Movies-Collection.jpg'
import Rating from '../../Components/Rating';


const Home = () => {

    const [movies, setMovies] = useState([]);
    const [moviesToDisplay, setMoviesToDisplay] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [sortedMovies, setSortedMovies] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/movie/getallmovies')
            setMovies(response.data.movies);
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchTopMovies = async () => {
        try {
            const response = await axios.get('http://localhost:3001/movie/topmovies')
            console.log(response.data);
            setTopMovies(response.data.movies);
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
        fetchTopMovies();
    }, [])

    useEffect(() => {
        const sortedMovies = sortMovies();
        setSortedMovies(sortedMovies);    
    }, [movies])

    useEffect(() => {
        const movies = topMovies.slice(0, 5);
        setMoviesToDisplay(movies);
    }, [topMovies])

    const [showModal, setShowModal] = useState(false);

     return (
        <div className='relative min-h-screen pb-20 overflow-hidden bg-gray-900'>
            <div className='flex flex-col gap-10'>
                <div className="relative w-full h-auto lg:h-screen">
                    <img src={Cover} className='absolute top-0 left-0 w-screen h-full' alt='cover image'  />
                    <div className='absolute top-0 left-0 w-screen h-full text-white bg-black bg-opacity-75'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 5000,
                            duration: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                          }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                        >
                        {moviesToDisplay.length > 0 ? moviesToDisplay.map((movie) => (
                            <SwiperSlide key={movie.id} className='swiper-slide'>
                                <div className='relative flex items-center justify-center w-full h-full mt-20 align-middle bg-transparent'>
                                    <div className="flex flex-row items-center justify-center lg:w-[70vw] w-full h-fit gap-20 transition-all duration-300 p-5 cursor-pointer rounded-2xl hover:bg-opacity-50 hover:scale-105 hover:bg-black">
                                        <div className='flex flex-col gap-2 p-5 py-5 text-left text-white'>
                                            <div className="flex flex-row gap-5 py-1 font-bold">
                                                <div className="flex flex-col gap-2">
                                                    <span className='min-w-fit'>{movie?.title}</span>
                                                    <span className='min-w-fit'>{movie?.genre}</span>
                                                </div>
                                            </div>
                                            <Rating ratings={movie.averageRating} />
                                            <div className="flex flex-col gap-2 mt-1">
                                                <span className='font-bold min-w-fit'>Overview:</span>
                                                <span className='text-sm min-w-fit'>{movie?.description}</span>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <img src={movie.poster} className='min-w-[200px] max-h-[300px] min-h-[300px]' alt='poster'/>
                                        </div>
                                    </div>
                                </div>
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
                    {/* Absolute positioned button */}
                    <button onClick={() => setShowModal(true)} className="fixed z-50 px-4 py-4 text-white bg-red-500 rounded-full bottom-5 right-5">Add</button>
                    <Modal showModal={showModal} setShowModal={setShowModal} />
                </div>

                <div className='flex flex-col w-screen gap-5 px-10 text-white text-start'>
                    <h className='text-xl font-bold'>High Rated</h>
                    <Carousal data={topMovies}/>
                </div>

                <div className='flex flex-col w-screen gap-5 px-10 text-white text-start'>
                    <h className='text-xl font-bold'>Most Reviews</h>
                    <Carousal data={movies}/>
                </div>
            </div>
        </div>
    );
}

export default Home;