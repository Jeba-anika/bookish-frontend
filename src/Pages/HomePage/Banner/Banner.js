import React from 'react';
import './Banner.css'
import books from '../../../assets/pile of books.png'

const Banner = () => {
    return (
        <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-0 '>
            <div className='bg-primary lg:rounded-bl-xl  md:rounded-bl-xl lg:rounded-tr-none md:rounded-tr-none sm:rounded-tr-xl rounded-tr-xl '>
                <div className='bg-secondary w-10 h-10'></div>
                <div className='bg-secondary w-10 h-10 ml-10'></div>
                <h2 className='banner-font lg:text-6xl md:text-5xl sm:text-4xl text-4xl lg:p-20 md:p-10 p-6 sm:p-10  font-bold'>BUY AND SELL BOOKS, GAIN AND SHARE KNOWLEDGE</h2>
            </div>
            <div className='bg-secondary relative flex justify-center items-center lg:rounded-bl-none lg:rounded-tr-xl md:rounded-bl-none md:rounded-tr-xl sm:rounded-bl-xl rounded-bl-xl '>
                <div>
                    <img className='w-96' src={books} alt="" />
                </div>
                <div className='bg-primary absolute bottom-0 right-0 w-10 h-10'></div>
                <div className='bg-primary absolute bottom-10 right-10 w-10 h-10'></div>
            </div>
        </div>
    );
};

export default Banner;