import React from 'react';
import { useState} from "react";


import Poster from '../../Resources/unnamed.jpg'
const movies = [
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    {
        title: 'Movie',
        genre: 'Action',
        poster: Poster
    },
    
]

const Movies = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const filteredMovies = movies.filter((movie) => {
        const nameMatch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch
    });

    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 15;
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesToDisplay = filteredMovies.slice(startIndex, endIndex);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPageButtonsToShow = 5;

        if (totalPages <= maxPageButtonsToShow) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Show a limited number of pages with ellipsis
            const leftEllipsis = currentPage > 2;
            const rightEllipsis = currentPage < totalPages - 1;

            if (leftEllipsis) {
                pageNumbers.push(1);
                pageNumbers.push("...");
            }
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                if (i >= 1 && i <= totalPages) {
                    pageNumbers.push(i);
                }
            }
            if (rightEllipsis) {
                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            }
        }
        return pageNumbers;
    };

    return (
        <div className='w-screen h-screen overflow-x-hidden bg-gray-900 min-w-screen -z-50'>
            <div className='relative w-screen'>
                <div className='w-full h-[40vh] flex flex-row justify-between relative'>
                    <img src={Poster} className='w-[33.33vw] h-[40vh]' alt='Poster'/>
                    <img src={Poster} className='w-[33.33vw] h-[40vh]' alt='Poster'/>
                    <img src={Poster} className='w-[33.33vw] h-[40vh]' alt='Poster'/>
                    <div className='absolute top-0 left-0 w-full h-[40vh] bg-black bg-opacity-75'></div>
                </div>
                <div className='absolute w-screen p-10 top-32'>
                    <div className={`h-full w-full bg-gray-950 flex flex-col items-center transition-all duration-500 p-10`}>
                        <div className='flex flex-row items-center justify-between w-full gap-10'>
                            <h className='font-serif text-3xl font-bold text-white'>Movies</h>
                            <div className='flex flex-row p-3 bg-gray-300 rounded-lg'>
                                <input onChange={handleSearchChange} type='text' className='w-full h-full bg-gray-300 border-none rounded-lg outline-none' placeholder='search...' />
                                {/* <img src={Search} className='w-5 h-5' /> */}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-col w-full gap-3 mt-10'>
                                <div className='grid w-full h-full grid-cols-5 gap-5'>
                                    {
                                        moviesToDisplay.map((movie) => (
                                            <div className='relative bg-black rounded-2xl'>
                                                <img src={movie.poster} className='h-[250px]' alt='Movie Poster'/>
                                                <div className='absolute top-0 left-0 flex flex-col justify-between w-full h-full p-5 transition-all duration-300 bg-black bg-opacity-0 opacity-0 cursor-pointer hover:opacity-100 hover:bg-opacity-75'>
                                                    <div className='flex flex-col justify-between gap-1'>
                                                        <h className='text-xl font-bold text-white'>{movie.title}</h>
                                                        <span className='font-semibold text-white'>{movie.genre}</span>
                                                    </div>
                                                    <div className='flex justify-end w-full'>
                                                        <button className="px-5 text-xs p-2 font-semibold text-white transition-all duration-300 bg-black rounded hover:bg-gradient-to-t  from-red-500 to-black to-80%">See Details</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-start mt-4 text-white ">
                                <div
                                    onClick={currentPage === 1 ? null : () => setCurrentPage(currentPage - 1)}
                                    className={`flex flex-row gap-1 mt-1 ml-2 cursor-pointer ${currentPage === 1 ? 'opacity-50' : ''}`} // Adding 'opacity-50' class when currentPage is 1
                                >
                                    {/* <img src={Arrow} className='w-3 h-2 mt-[11px] rotate-90' /> */}
                                    <span>prev</span>
                                </div>

                                {getPageNumbers().map((pageNumber, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`mx-2 ${currentPage === pageNumber ? "bg-[#4D7CFE] text-white rounded py-1 px-3" : " text-white rounded- py-1 px-3"
                                            } rounded`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}
                                <div
                                    onClick={currentPage === totalPages ? null : () => setCurrentPage(currentPage + 1)}
                                    className={`flex flex-row gap-1 mt-1 ml-2 cursor-pointer ${currentPage === totalPages ? 'opacity-50' : ''}`} // Adding 'opacity-50' class when currentPage is 1
                                >
                                    <span>next</span>
                                    {/* <img src={Arrow} className='w-3 h-2 mt-[10px] -rotate-90' /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movies;