import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast';
import Loading from '../../../../Shared/Loading/Loading';

const CheckOutForm = ({booking}) => {
    const {bookedBookPrice, _id, userName, userEmail, productID} = booking;
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements()
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('')


    useEffect(()=>{
        fetch("https://bookish-server.vercel.app/create-payment-intent",{
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },

            body: JSON.stringify({price: bookedBookPrice})
        })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
    },[])

    const handleSubmit = async(event) =>{
        event.preventDefault()

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log(error)
            setCardError(error.message)
        }else{
            setCardError('')
        }
        setSuccess('')
        setProcessing(true)

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method:{
                    card: card,
                    billing_details: {
                        name: userName,
                        email : userEmail
                    }
                }
            }
        );

        if(confirmError){
            setCardError(confirmError.message);
            return;
        }

        if(paymentIntent.status === 'succeeded'){
            const payment = {
                price : bookedBookPrice,
                transactionId : paymentIntent.id,
                email : userEmail,
                bookingId : _id,
                productID: productID
            }

            fetch('https://bookish-server.vercel.app/payments',{
                method : 'POST',
                headers:{
                    'content-type' : 'application/json',
                },
                body : JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.acknowledged){
                    toast.success('Congratulations! Your payment is successful.')
                    setSuccess('Congratulations! Your payment is successful.')
                    setTransactionId(paymentIntent.id)
                }
            })
        }
        setProcessing(false);


    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm mt-4 btn-primary'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {processing && <Loading></Loading>}
            <p className='text-red-500'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transaction id is : <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckOutForm;