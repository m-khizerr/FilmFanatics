import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Poster from '../../Resources/Movies-Collection.jpg';
import { toast } from "sonner";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        localStorage.clear()
    },[])

    const validateInputs = () => {
        let isValid = true;

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Password validation
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateInputs()) {
            const formData = {
                email,
                password
            };
    
            try {
                const response = await axios.post(`http://localhost:3001/user/login`, formData);
                console.log('User logged in successfully:', response.data);
                localStorage.setItem('user', response.data.user.email);
                localStorage.setItem('funToken', response.data.token);
                toast.success('User Logged in!')
                // Redirect to home page upon successful login
                navigate('/home');
            } catch (error) {
                console.error('Error occurred during login:', error);
                toast.error("Error in User Login!")
                // Handle axios error
            }
        }
    };

    return (
        <div className="w-screen h-screen pt-10 mb-20 overflow-hidden bg-gray-900">
            <div className="relative flex flex-col w-full h-full gap-5 sm:gap-0 sm:flex-row">
                <div className="relative hidden w-full sm:w-3/5 sm:block">
                    <img src={Poster} className="w-full h-full" alt="Movie Collection Poster" />
                    <div className="absolute top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
                        <div className="p-10 text-white lg:p-20">
                            <h1 className="text-2xl font-extrabold text-red-500 lg:text-4xl sm:text-3xl">FILM FANATICS</h1>
                            <p className="text-sm font-bold lg:text-xl sm:text-lg">Your Ultimate Destination for Cinematic Delight! <span className="text-red-500">Explore</span>, <span className="text-red-500">Discover</span>, and <span className="text-red-500">Dive</span> into the World of Movies with Us.</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mt-20 bg-transparent sm:w-3/5 md:w-2/5 sm:mt-0">
                    <div className="w-3/5 p-5 text-sm text-center text-white rounded-lg shadow-inner shadow-red-500 sm:w-4/5 md:3/5">
                        <h2 className="text-xl font-semibold">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-10 mb-5">
                                <div className="mb-3">
                                    <label className="block font-semibold text-left">Email</label>
                                    <input 
                                        name="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="w-full p-1 bg-transparent border-b border-black rounded outline-none" 
                                        placeholder="abc@gmail.com" 
                                    />
                                    <p className="text-red-500">{emailError}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="block font-semibold text-left">Password</label>
                                    <input 
                                        name="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        type="password" 
                                        className="w-full p-1 bg-transparent border-b border-black rounded outline-none" 
                                        placeholder="*********" 
                                    />
                                    <p className="text-red-500">{passwordError}</p>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full p-2 font-semibold transition-all duration-300 bg-black rounded hover:bg-gradient-to-t  from-red-500 to-black to-80%"
                            >
                                Login
                            </button>
                            <div className="mt-2 text-left">
                                <span className="text-xs font-normal">Don't have an account? <b onClick={() => navigate('/signup')} className="text-red-500 cursor-pointer hover:underline">Signup!</b></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
