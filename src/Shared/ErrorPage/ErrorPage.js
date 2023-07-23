import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assets/404.png'

const ErrorPage = () => {
    return (
        <div className='flex flex-col my-10 mx-auto items-center justify-center'>
            <img className='w-96 ' src={error} alt="" />
            
            <p className='text-2xl my-10'> Opps! An Error has occured. Go back to <Link className='btn btn-outline text-red-500' to='/'>Home</Link></p>
        </div>
    );
};

export default ErrorPage;