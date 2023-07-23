import React from 'react';
import './Purpose.css'

const PurposeSection = () => {
    return (
        <div className=' flex flex-col mx-auto text-center py-20 w-1/2 relative'>
            <div className='bg-primary w-10 h-10'></div>
            <div className='bg-secondary w-10 h-10 ml-10'></div>
            <h2 className='purpose-font text-5xl'>WHAT DO WE DO?</h2>
            <p className='text-2xl'>Bookish is a leading book resale website. You can sell your collection of books and also buy from others. Our purpose is to spread knowledge.</p>
            <div className='w-10 h-10 absolute bottom-10 right-10 bg-slate-200 rounded-full'></div>
        </div>
    );
};

export default PurposeSection;