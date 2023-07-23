import React, { useState } from 'react';
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query';


const AdvertiseSection = () => {


    const { data: advertisedItems = [] } = useQuery({
        queryKey: ['advertised'],
        queryFn: async () => {
            return await fetch('https://bookish-server.vercel.app/product-advertise')
                .then(res => res.json())
        }
    })

    return (
        <div className=' mx-auto my-10'>

            {
                advertisedItems.length > 0 &&
                <div>
                    <div className='bg-secondary w-10 h-10'></div>
                    <div className='bg-secondary w-10 h-10 ml-10'></div>
                    <h2 className='text-center text-4xl font-bold my-4'>Featured Collection:</h2>
                    <div className='flex flex-row w-full gap-4 mx-auto'>
                        {advertisedItems.map((item, i) => <div className='w-40'>
                            <img src={item.picture} alt=''></img>
                        </div>
                        )}
                    </div>
                </div>
            }

        </div>
    );
};

export default AdvertiseSection;