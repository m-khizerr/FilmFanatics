import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ showModal, setShowModal, update, setUpdate, movieId }) => {

    const [content, setContent] = useState('');
    const [ratings, setRatings] = useState(0);

    const [errors, setErrors] = useState({
        rating: 0,
        content: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
        if (ratings === 0) {
            newErrors.rating = 'Rating is required';
            isValid = false;
        }

        if (!content) {
            newErrors.content = 'review is required';
            isValid = false;
        }

        // Set error messages
        setErrors(newErrors);

        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const userEmail = localStorage.getItem('user');

            const formData = {
                content: content,
                rating: ratings,
                movieId: movieId,
                userEmail: userEmail
            }
            try {
                const response = await axios.post(`http://localhost:3001/review/addreview`, formData );    
                console.log('Form submitted:', );
                setShowModal(false);
            } catch (error) {
                console.log(error.message);
            }
        } 
    }
    
    return (
        <>
            {showModal && (
                <div className="fixed z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none inset-y-5 inset-2 sm:inset-y-0 sm:inset-0 focus:outline-none">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="relative w-auto mx-auto my-6">
                        <div className="relative flex flex-col w-full max-h-[80vh] shadow-2xl shadow-black bg-gray-900 border-0 rounded-lg outline-none focus:outline-none">
                            <div className="flex items-center justify-between gap-5 p-3 border-b border-solid rounded-t border-blueGray-200">
                                <h className='text-base font-bold text-white'>Post Review</h>
                                <img src="" className='w-5 h-5 transition-all duration-200 cursor-pointer hover:scale-110' onClick={() => setShowModal(false)} alt='close'/>
                            </div>
                            <div className='flex flex-row gap-20'>
                                <div className='flex flex-col gap-3 font-normal text-white pt-5 w-full'>
                                    <div className='w-full flex flex-row gap-5 justify-between px-10 items-center align-middle'>
                                        <h className='text-base font-bold'>Review Ratings</h>
                                        <StarRating rating={ratings} setRatings={setRatings} />
                                    </div>
                                    {errors.rating && <span className="text-sm text-red-500 px-10">{errors.rating}</span>}
                                    <div className="px-10 mt-3 mb-3 text-white">
                                        <label className="block font-semibold text-left">Review</label>
                                            <textarea 
                                                name="content" 
                                                value={content} 
                                                onChange={(e) => setContent(e.target.value)} 
                                                rows={5} 
                                                className="w-full p-1 overflow-hidden bg-transparent border-b border-black rounded outline-none" 
                                                placeholder=" I love this movie. It is good. Detective stuff and Fighting stuff .Acting is amazing. Keeps you thinking. Long review: I really do Love this Movie. I saw it on opening night and have no regrets. I will admit it is a bit slow at the beginning but honestly I kind of liked that. It really showed his detective side. He is the world's greatest detective and that isn't shown enough in my opinion..." 
                                            />
                                        {errors.content && <span className="text-sm text-red-500">{errors.content}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-40 p-2 text-white border-t border-solid rounded-b border-blueGray-200">
                                <button 
                                    onClick={() => {setShowModal(false)}} 
                                    className="w-[150px] p-2 font-semibold transition-all duration-300 bg-black rounded hover:bg-gradient-to-t  from-red-500 to-black to-80%">Cancel</button>
                                <button 
                                    onClick={handleSubmit} 
                                    className="w-[150px] p-2 font-semibold transition-all duration-300 bg-black rounded hover:bg-gradient-to-t  from-red-500 to-black to-80%">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
    
}

const StarRating = ({ rating, setRatings }) => {
    const stars = [];
    // Fill stars array based on rating
    for (let i = 0; i < 5; i++) {
      const starSize = 'text-xl'; // Adjust the font size here
      const starColor = i < rating ? 'text-red-500' : 'text-gray-400';
      stars.push(
        <span
          className={`cursor-pointer ${starColor} ${starSize}`}
          onClick={() => setRatings(i + 1)}
          key={i}
        >
          &#9733;
        </span>
      );
    }
    return <div className="flex gap-1">{stars}</div>;
  };

export default Modal;
