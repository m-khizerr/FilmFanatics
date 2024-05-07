import React from 'react';
import { useState } from 'react';

const Modal = ({ showModal, setShowModal, update, setUpdate }) => {

    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        description: '',
        poster: '',
        trailer: '',
    });
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    return (
        <>
            {showModal && (
                <div className="fixed z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none inset-y-5 inset-2 sm:inset-y-0 sm:inset-0 focus:outline-none">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="relative w-auto mx-auto my-6">
                        <div className="relative flex flex-col w-full max-h-[80vh] shadow-2xl shadow-black bg-gray-900 border-0 rounded-lg outline-none focus:outline-none">
                            <div className="flex items-center justify-between gap-5 p-3 border-b border-solid rounded-t border-blueGray-200">
                                <h className='text-white text-base font-bold'>Movie Details</h>
                                <img src="" className='w-5 h-5 transition-all duration-200 cursor-pointer hover:scale-110' onClick={() => setShowModal(false)} alt='close'/>
                            </div>
                            <div className='flex flex-row gap-10 px-10'>
                                <div className='flex flex-col gap-3 font-normal text-white w-fit pt-5 '>
                                    <div className="mb-3">
                                        <label className="block font-semibold text-left">Title</label>
                                        <input name="title" onChange={handleInputChange} className="w-full p-1 bg-transparent border-b border-black rounded outline-none" placeholder="The Batman" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block font-semibold text-left">Genre</label>
                                        <input name="genre" onChange={handleInputChange} className="w-full p-1 bg-transparent border-b border-black rounded outline-none" placeholder="Action/Crime" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block font-semibold text-left">Trailer (LINK)</label>
                                        <input name="trailer" onChange={handleInputChange} className="w-full p-1 bg-transparent border-b border-black rounded outline-none" placeholder="The Batman" />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 font-normal text-white w-fit pt-5 '>
                                    <div className="mb-3 w-[100px] h-[126px] bg-black flex items-center justify-center align-middle">
                                        <img src={formData.poster} className='min-w-full min-h-full' alt='Poster' />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block font-semibold text-left">Poster (LINK)</label>
                                        <input name="poster" onChange={handleInputChange} className="w-full p-1 bg-transparent border-b border-black rounded outline-none" placeholder="Action/Crime" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-3 px-10 text-white mt-3">
                                    <label className="block font-semibold text-left">Summary</label>
                                    <textarea name="description" onChange={handleInputChange} rows={4} className="w-full p-1 bg-transparent overflow-hidden border-b border-black rounded outline-none" placeholder="Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past." />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-2 border-t border-solid rounded-b border-blueGray-200 gap-40 text-white">
                                <button 
                                    onClick={() => {setShowModal(false)}} 
                                    className="w-[150px] p-2 font-semibold transition-all duration-300 bg-black rounded hover:bg-gradient-to-t  from-red-500 to-black to-80%">Cancel</button>
                                <button 
                                    onClick={() => {setShowModal(false)}} 
                                    className="w-[150px] p-2 font-semibold transition-all duration-300 bg-black rounded hover:bg-gradient-to-t  from-red-500 to-black to-80%">Add Movie</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
