import React from 'react';
import Button from '../../../Shared/Button/Button';
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigation } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';

const CategorySection = ({ categories }) => {
    const navigation = useNavigation()

    if(navigation.state === 'loading'){
        return <Loading></Loading>
    }


    return (
        <div className='bg-primary rounded-xl relative mb-20'>

            <div className='bg-slate-100 w-10 h-10'></div>
            <div className='bg-slate-100 w-10 h-10 ml-10'></div>


            <div className='flex items-center justify-center py-20'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 lg:p-0 md:p-4 sm:p-6 p-6'>
                    {
                        categories.map(category => <div key={category.id} className="card lg:w-96 shadow-xl image-full">
                            <figure><img src={category.photo} alt={category.name} /></figure>
                            <div className="card-body text-center items-center justify-center">
                                <h2 className=" text-center font-bold text-4xl">{category.name}</h2>
                                <div className=" justify-end items-end">
                                    <Button classes={'font-bold'}><Link className='flex' to={`/category/${category.id}`}>See Books <BsArrowRight className='ml-2 font-bold animate-pulse'></BsArrowRight></Link></Button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <div className='bg-slate-100 absolute bottom-0 right-0 w-10 h-10'></div>
            <div className='bg-slate-100 absolute bottom-10 right-10 w-10 h-10'></div>
        </div>
    );
};

export default CategorySection;