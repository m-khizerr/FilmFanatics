import React, { useRef, useState } from 'react';
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

    const imgSrc = "data:image/jpeg;base64,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"

    return (
        <div className="w-screen min-h-screen overflow-x-hidden bg-gray-900 p-20 mt-10">
            <div className="flex flex-col gap-10">
                <div className="flex flex-row gap-10 justify-between">
                    <div className="flex flex-row gap-10 w-[50%]">
                        <div className="w-fit h-full bg-black rounded">
                            <img src={imgSrc} 
                                alt="poster" className="min-w-[200px] h-[300px] object-cover" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className="flex flex-row gap-5 text-white font-bold py-5">
                                <div className="flex flex-col gap-2">
                                    <span className='min-w-fit'>Movie Title: </span>
                                    <span className='min-w-fit'>Genre: </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className='min-w-fit'>The Batman</span>
                                    <span className='min-w-fit'>Action/Crime</span>
                                </div>
                            </div>
                            <Rating ratings={4} />
                            <div className="flex flex-col gap-2 text-white">
                                <span className='min-w-fit font-bold'>Overview:</span>
                                <span className='min-w-fit'>Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past.</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-[50%]'>
                        <iframe
                            className="w-full h-[300px] rounded"
                            src="https://www.youtube.com/embed/mqqft2x_Aa4?si=b8daQP1KS3dbPP0s" // Replace VIDEO_ID with the actual ID of the YouTube video
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    {/* <div className="flex flex-col p-5 border-black border-2 rounded-2xl w-full max-h-[300px] h-full overflow-auto gap-3">
                        {
                            reviews.map((review) => (
                                <div className="flex flex-col gap-1 text-white text-xs border-b-[1px] pb-3 border-black px-2">
                                    <div className="flex flex-row gap-10 justify-between">
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