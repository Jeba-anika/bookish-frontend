import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import Button from '../../../../Shared/Button/Button';

const AllOrderOfBuyer = () => {
    const { user } = useContext(AuthContext)

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            return fetch(`https://bookish-server.vercel.app/bookings?email=${user?.email}`,{
                headers: {
                    authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())

        }
    })

    return (
        <div>
            <div className="overflow-x-auto hidden lg:block md:block">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>BookName</th>
                            <th>Resale Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((product, index) => <tr key={index} className="hover">
                                <th>{index + 1}</th>
                                <td><div className='flex items-center gap-2'><img className='w-10' src={product.productImg} alt=''></img><p className='font-bold'>{product.bookedBookName}</p></div></td>
                                <td>${product.bookedBookPrice}</td>
                                <td><div className='flex gap-2'>
                                    {
                                        product.paid ? <p className='text-primary'>Paid</p> : <Button classes={'btn-sm'}><Link to={`/dashboard/payment/${product._id}`}>Pay</Link></Button>
                                    }
                                    {
                                        !product.paid && <button className='bg-red-500 btn btn-sm'>Cancel</button>
                                    }
                                </div>
                                </td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>
            <div className='lg:hidden md:hidden flex flex-col gap-4'>
                {bookings.map(product => <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src={product.productImg} alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.bookedBookName}</h2>
                        <p>Resale Price: {product.bookedBookPrice}</p>
                        <div className=" justify-end flex flex-row gap-2">
                            {
                                product.paid ? <p className='text-primary'>Paid</p> : <Button classes={'btn-sm'}><Link to={`/dashboard/payment/${product._id}`}>Pay</Link></Button>
                            }
                            {
                                !product.paid && <button className='bg-red-500 btn btn-sm'>Cancel</button>
                            }
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default AllOrderOfBuyer;