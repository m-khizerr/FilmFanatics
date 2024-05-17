import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const Modal = ({ showModal, setShowModal, update, setUpdate }) => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        description: '',
        poster: '',
        trailer: '',
    });

    const [errors, setErrors] = useState({
        title: '',
        genre: '',
        description: '',
        poster: '',
        trailer: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Reset error message for the input being changed
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate each input field
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!formData.genre.trim()) {
            newErrors.genre = 'Genre is required';
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        if (!formData.poster.trim()) {
            newErrors.poster = 'Poster link is required';
            isValid = false;
        }

        if (!formData.trailer.trim()) {
            newErrors.trailer = 'Trailer link is required';
            isValid = false;
        }

        // Set error messages
        setErrors(newErrors);

        return isValid;
    };

    const validateUrl = async (url) => {
        try {
            const response = await fetch(url);
            return true;
        } catch (error) {
            console.error('Error validating image URL:', error);
            return false;
        }
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            // Validate image URL
            const isImageUrlValid = await validateUrl(formData.poster);
            //const isTrailerUrlValid = await validateUrl(formData.trailer);
            if (isImageUrlValid ) {
                // Image URL is valid, proceed with form submission
                try {
                    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/movie/addmovie`, formData);
                    console.log('Form submitted:', formData);
                    toast.success('Movie added successfully!');
                    setShowModal(false);
                } catch (error) {
                    console.log(error.message);
                }
            } else {
                // Invalid image URL
                console.log('Invalid URL');
                toast.error('Error in adding the movie!')
            }
        }
    };
    
    return (
        <>
            {showModal && (
                <div className="fixed z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none inset-y-5 inset-2 sm:inset-y-0 sm:inset-0 focus:outline-none max-w-[95vw]">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="relative w-auto mx-auto my-6 max-w-[95vw]">
                        <div className="relative flex flex-col w-full max-h-[80vh] shadow-2xl shadow-black bg-gray-900 border-0 rounded-lg outline-none focus:outline-none">
                            <div className="flex items-center justify-between gap-5 p-3 border-b border-solid rounded-t border-blueGray-200">
                                <h className='text-base font-bold text-white'>Movie Details</h>
                                <img src="" className='w-5 h-5 transition-all duration-200 cursor-pointer hover:scale-110' onClick={() => setShowModal(false)} alt='close'/>
                            </div>
                            <div className='flex flex-row gap-5 px-5 sm:gap-20 sm:px-16'>
                                <div className='flex flex-col gap-3 font-normal text-white pt-5 w-[200px]'>
                                    <div className="mb-3">
                                        <label className="block font-semibold text-left">Title</label>
                                        <input 
                                            name="title" 
                                            value={formData.title} 
                                            onChange={handleInputChange} 
                                            className="w-full p-1 bg-transparent border-b border-black rounded outline-none" 
                                            placeholder="The Batman" 
                                        />
                                        {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="block font-semibold text-left">Genre</label>
                                        <input 
                                            name="genre" 
                                            value={formData.genre} 
                                            onChange={handleInputChange} 
                                            className="w-full p-1 bg-transparent border-b border-black rounded outline-none" 
                                            placeholder="Action/Crime" 
                                        />
                                        {errors.genre && <span className="text-sm text-red-500">{errors.genre}</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="block font-semibold text-left">Trailer (LINK)</label>
                                        <input 
                                            name="trailer" 
                                            value={formData.trailer} 
                                            onChange={handleInputChange} 
                                            className="w-full p-1 bg-transparent border-b border-black rounded outline-none" 
                                            placeholder="The Batman" 
                                        />
                                        {errors.trailer && <span className="text-sm text-red-500">{errors.trailer}</span>}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 pt-5 font-normal text-white w-[200px] '>
                                    <div className="mb-3 w-[100px] h-[126px] bg-black flex items-center justify-center align-middle">
                                        <img src={formData.poster} className='min-w-full min-h-full' alt='Poster' />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block font-semibold text-left">Poster (LINK)</label>
                                        <input 
                                            name="poster" 
                                            value={formData.poster} 
                                            onChange={handleInputChange} 
                                            className="w-full p-1 bg-transparent border-b border-black rounded outline-none" 
                                            placeholder="Action/Crime" 
                                        />
                                        {errors.poster && <span className="text-sm text-red-500">{errors.poster}</span>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="px-5 mt-3 mb-3 text-white sm:px-16">
                                    <label className="block font-semibold text-left">Summary</label>
                                    <textarea 
                                        name="description" 
                                        value={formData.description} 
                                        onChange={handleInputChange} 
                                        rows={4} 
                                        className="w-full p-1 overflow-hidden bg-transparent border-b border-black rounded outline-none" 
                                        placeholder="Batman is called to intervene when the mayor of Gotham City is murdered. Soon, his investigation leads him to uncover a web of corruption, linked to his own dark past." 
                                    />
                                    {errors.description && <span className="text-sm text-red-500">{errors.description}</span>}
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-40 p-2 text-white border-t border-solid rounded-b border-blueGray-200">
                                <button 
                                    onClick={() => {setShowModal(false)}} 
                                    className="w-[150px] p-2 font-semibold transition-all duration-300 bg-black rounded hover:bg-gradient-to-t  from-red-500 to-black to-80%">Cancel</button>
                                <button 
                                    onClick={handleSubmit} 
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
