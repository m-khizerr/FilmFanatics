import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

const reviews = [
    {
        user: 'Khizer Tariq',
        rating: 1,
        content: ' I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world`s greatest detective and that isn`t shown enough in my opinion'
    },
    {
        user: 'Khizer Tariq',
        rating: 2,
        content: ' I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world`s greatest detective and that isn`t shown enough in my opinion'
    },
    {
        user: 'Khizer Tariq',
        rating: 3,
        content: ' I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world`s greatest detective and that isn`t shown enough in my opinion'
    },
    {
        user: 'Khizer Tariq',
        rating: 4,
        content: ' I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world`s greatest detective and that isn`t shown enough in my opinion'
    },
    {
        user: 'Khizer Tariq',
        rating: 5,
        content: ' I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world`s greatest detective and that isn`t shown enough in my opinion'
    },
    {
        user: 'Khizer Tariq',
        rating: 6,
        content: ' I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world`s greatest detective and that isn`t shown enough in my opinion'
    },
    {
        user: 'Khizer Tariq',
        rating: 7,
        content: ' I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world`s greatest detective and that isn`t shown enough in my opinion'
    },
    {
        user: 'Khizer Tariq',
        rating: 8,
        content: ' I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world`s greatest detective and that isn`t shown enough in my opinion'
    },
    {
        user: 'Khizer Tariq',
        rating: 9,
        content: ' I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world`s greatest detective and that isn`t shown enough in my opinion'
    },
    {
        user: 'Khizer Tariq',
        rating: 10,
        content: ' I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world`s greatest detective and that isn`t shown enough in my opinion'
    },
]

const Movie = () => {

    const { id } = useParams();
    console.log('Movie to get',id);

    const [movieData, setMovieData] = useState({
        title: '',
        genre: '',
        poster: '',
        trailer: '',
        description: ''
    });
    const fetchMovie = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/movie/getmovie/${id}`)
            setMovieData(response.data.movie);
            console.log(response.data.movie)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchMovie();
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
        <div className="w-screen min-h-screen p-20 mt-10 overflow-x-hidden bg-gray-900">
            <div className="flex flex-col gap-10">
                <div className="flex flex-row justify-between gap-10">
                    <div className="flex flex-row gap-10 w-[50%]">
                        <div className="h-full bg-black rounded w-fit">
                            <img src={movieData?.poster} 
                                alt="poster" className="min-w-[200px] h-[300px] object-cover" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-5 py-5 font-bold text-white">
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
                            <div className="flex flex-col gap-2 text-white">
                                <span className='font-bold min-w-fit'>Overview:</span>
                                <span className='min-w-fit'>{movieData?.description}</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-[50%]'>
                        <iframe
                            className="w-full h-[300px] rounded"
                            src={embedUrl} // Replace VIDEO_ID with the actual ID of the YouTube video
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    {/* <div className="flex flex-col p-5 border-black border-2 rounded-2xl w-full max-h-[300px] h-full overflow-auto gap-3">
                        {
                            reviews.map((review) => (
                                <div className="flex flex-col gap-1 text-white text-xs border-b-[1px] pb-3 border-black px-2">
                                    <div className="flex flex-row justify-between gap-10">
                                        <span className="font-bold">{review.user}</span>
                                        <span>{review.rating}</span>
                                    </div>
                                    <p>{review.content}</p>
                                </div>
                            ))
                        }
                    </div> */}
                </div>
            </div>
            <div className="w-full h-[250px] mt-10">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={15}
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
                                <div className="flex flex-col gap-3 p-7 text-white text-start text-xs bg-gray-950 rounded-[32px] min-h-full cursor-pointer hover:bg-red-500 hover:bg-opacity-5">
                                    <div className="flex flex-row gap-10 justify-between border-b-[1px] border-white py-2">
                                        <span className="font-bold">{review.user}</span>
                                        <Rating ratings={review.rating} />
                                    </div>
                                    <p className='line-clamp-[9] text-[10px]'>{review.content}</p>
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