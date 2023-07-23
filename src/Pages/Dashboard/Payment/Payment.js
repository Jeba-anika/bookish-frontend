import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm/CheckOutForm';

const Payment = () => {
    const booking = useLoaderData()
    const {
        bookedBookName,
        bookedBookPrice,
        productImg,
        userName } = booking

    const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk)

    const appearance = {
        theme: 'stripe',
      };

    const option = {
        appearance
    }



    return (
        <div className='flex items-center justify-center '>
            <div className='flex lg:flex-row md:flex-row flex-col border p-6 gap-4 rounded-xl'>
                <img className='w-1/4' src={productImg} alt="" />
                <div className='w-3/4'>
                    <h2 className='text-2xl'>You are about to pay for : <span className='font-bold'>{bookedBookName}</span></h2>
                    <p className='text-xl'>Amount of payment : <span className='font-bold text-2xl'>${bookedBookPrice}</span></p>
                    <p>Payment is done by : {userName}</p>
                    <div className='w-96 my-6'>
                        <Elements options={option} stripe={stripePromise}>
                            <CheckOutForm
                                booking={booking} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;