import React from "react";
import Poster from '../../Resources/Movies-Collection.jpg'

const Signup = () => {
    return(
        <div className="w-screen h-screen pt-10 overflow-hidden bg-gray-900">
            <div className="relative flex flex-col w-full h-full gap-5 sm:gap-0 md:flex-row">
                <div className="relative w-full md:w-3/5">
                    <img src={Poster} className="w-full h-full" alt="Movie Collection Poster" />
                    <div className="absolute top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
                        <div className="p-10 text-white lg:p-20">
                            <h1 className="text-2xl font-extrabold text-red-500 lg:text-4xl sm:text-3xl">FILM FANATICS</h1>
                            <p className="text-sm font-bold lg:text-xl sm:text-lg">Your Ultimate Destination for Cinematic Delight! <span className="text-red-500">Explore</span>, <span className="text-red-500">Discover</span>, and <span className="text-red-500">Dive</span> into the World of Movies with Us.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full bg-transparent md:w-2/5">
                    <div className="w-4/5 p-5 text-sm text-center text-white rounded-lg shadow-inner shadow-red-500 md:w-3/5">
                        <h2 className="text-xl font-semibold">Sign Up</h2>
                        <div className="my-10">
                            <div className="mb-3">
                                <label className="block font-semibold text-left">Name</label>
                                <input type="text" name="name" className="w-full p-1 bg-transparent border-b border-black rounded outline-none" placeholder="Thomas Shelby" />
                            </div>
                            <div className="mb-3">
                                <label className="block font-semibold text-left">Email</label>
                                <input type="email" name="email" className="w-full p-1 bg-transparent border-b border-black rounded outline-none" placeholder="abc@gmail.com" />
                            </div>
                            <div className="mb-3">
                                <label className="block font-semibold text-left">Password</label>
                                <input type="password" name="password" className="w-full p-1 bg-transparent border-b border-black rounded outline-none" placeholder="******" />
                            </div>
                        </div>
                        <button className="w-full p-2 font-semibold transition-all duration-300 bg-black rounded hover:bg-gradient-to-t  from-red-500 to-black to-80%">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;