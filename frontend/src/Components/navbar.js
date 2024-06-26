import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from '../Resources/Logo.png'

const Navbar = () => {

    const [profile, setProfile] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [selected, setSelected] = useState('Home');

    const navigate = useNavigate();

    const [token, setToken] = useState();
    useEffect(() => {
        const token = localStorage.getItem('funaticToken');
        setToken(token);
    },[])

    return(
        <nav class="bg-gray-950 fixed top-0 left-0 w-screen z-50">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                        <div class="flex flex-shrink-0 items-center gap-2">
                            <img class="h-8 w-auto" src={Logo} alt="Your Company" />
                            <h className = 'text-xl font-bold text-white'>Film Fanatics</h>
                        </div>
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <span onClick={() => {setSelected('Home'); navigate('/home')}} class={`hover:text-red-500 px-3 py-2 text-sm font-medium cursor-pointer ${ selected === 'Home' ? 'text-red-500' : 'text-white'}`}>Home</span>
                            <span onClick={() => {setSelected('Collection'); navigate('/movies')}} class={`hover:text-red-500 px-3 py-2 text-sm font-medium cursor-pointer ${ selected === 'Collection' ? 'text-red-500' : 'text-white'}`}>Collection</span>
                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex gap-5 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div class="relative ml-3">
                            <div onClick={() => {setProfile(!profile); setMobileView(false) }}>
                                <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span class="absolute -inset-1.5"></span>
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                </button>
                            </div>

                            <div class={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1
                                            ${ profile && token ? 'block' : 'hidden' }
                                        `}>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Profile</a>
                                <span onClick={() => navigate('/login')} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</span>
                            </div>
                            <div class={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1
                                            ${ profile && !token ? 'block' : 'hidden' }
                                        `}>
                                <span onClick={() => {navigate('/login'); setProfile(false)}} class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign in</span>
                            </div>
                        </div>
                        <div onClick={() => {setMobileView(!mobileView); setProfile(false) }} className="sm:hidden block min-w-10 min-h-10 border-2 border-[]white">

                        </div>
                    </div>
                </div>
            </div>

            <div class={`sm:hidden ${ mobileView ? 'block' : 'hidden'}`} id="mobile-menu">
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <span onClick={() => navigate('/home')} class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Home</span>
                    <span onClick={() => navigate('/movies')} class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Collection</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;