import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../Components/AddReviewForm';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

import Rating from '../../Components/Rating';

const Movie = () => {

    const { id } = useParams();
    const token = localStorage.getItem('funToken')

    const [showModal, setShowModal] = useState(false);
    const [movieData, setMovieData] = useState({
        title: '',
        genre: '',
        poster: '',
        trailer: '',
        description: ''
    });
    const [reviews, setReviews] = useState([]);
    const fetchMovie = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/movie/getmovie/${id}`)
            setMovieData(response.data.movie);
            console.log(response.data.movie)
        } catch (error) {
            console.log(error.message);
        }
    }
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/review/getreviews/${id}`)
            setReviews(response.data.reviews);
            console.log(response.data.movie)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchMovie();
        fetchReviews();
    }, [])

    function convertToEmbedUrl(youtubeUrl) {
        // Extract video ID from the URL
        const videoId = youtubeUrl.split('/').pop().split('?')[0];
      
        // Construct the embed URL
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      
        return embedUrl;
    }

    const embedUrl = convertToEmbedUrl(movieData.trailer);

    return (
        <div className="w-screen min-h-screen p-5 pt-20 mt-10 mb-20 overflow-x-hidden bg-gray-900 sm:p-10 lg:p-20">
            <div className="flex flex-col gap-10">
                <div className="flex flex-col justify-between gap-10 lg:flex-row">
                    <div className="flex flex-row gap-5 sm:gap-10 lg:w-[50%]">
                        <div className="h-full bg-black rounded w-fit">
                            <img src={movieData?.poster} 
                                alt="poster" className="sm:min-w-[200px] min-w-[150px] h-[200px] sm:h-[300px] object-cover" />
                        </div>
                        <div className='flex flex-col justify-center gap-2 text-sm align-bottom sm:text-base'>
                            <div className="flex flex-row gap-5 py-1 font-bold text-white">
                                <div className="flex flex-col gap-2">
                                    <span className='min-w-fit'>Movie Title: </span>
                                    <span className='min-w-fit'>Genre: </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className='min-w-fit'>{movieData?.title}</span>
                                    <span className='min-w-fit'>{movieData?.genre}</span>
                                </div>
                            </div>
                            <Rating ratings={4} />
                            <div className="flex flex-col gap-2 mt-1 text-white">
                                <span className='font-bold min-w-fit'>Overview:</span>
                                <span className='text-xs sm:text-base min-w-fit'>{movieData?.description}</span>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-[50%]'>
                        <iframe
                            className="w-full h-full min-h-[300px] md:h-[400px] lg:h-[300px] rounded"
                            src={embedUrl} // Replace VIDEO_ID with the actual ID of the YouTube video
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="w-full h-[320px] mt-10 flex flex-col gap-5">
                <div className='flex flex-row items-center justify-between gap-10 text-white align-middle'>
                    <h className='text-lg font-bold '>Reviews</h>
                    <button onClick={() => setShowModal(true)} className={`w-[150px] p-2 font-semibold transition-all duration-300 bg-black rounded hover:bg-gradient-to-t  from-red-500 to-black to-80% ${token ? 'block' : 'hidden'}`}>
                        Post Review
                    </button>
                    <Modal showModal={showModal} setShowModal={setShowModal} movieId={id} />
                </div>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={15}
                    breakpoints={{
                        460: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                          },
                        600: {
                          slidesPerView: 2.5,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 3,
                          spaceBetween: 20,
                        },
                        840: {
                            slidesPerView: 3.5,
                            spaceBetween: 20,
                          },
                        1024: {
                          slidesPerView: 4,
                          spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                          },
                      }}
                    freeMode={true}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    {
                        reviews.map((review) => (
                            <SwiperSlide>
                                <div className="flex flex-col gap-3 min-w-full p-3 sm:p-7 text-white text-start text-xs bg-gray-950 rounded-[32px] min-h-full cursor-pointer hover:bg-red-500 hover:bg-opacity-5">
                                    <div className="flex flex-row gap-10 justify-between border-b-[1px] border-white py-2">
                                        <span className="font-bold">{review.user?.name}</span>
                                        <Rating ratings={review.review?.rating} />
                                    </div>
                                    <p className='line-clamp-[9] text-[10px]'>{review.review?.content}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Movie;