import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import Button from '../../../../Shared/Button/Button';
import Loading from '../../../../Shared/Loading/Loading';

const AllSellers = () => {
    const { userDelete, loading } = useContext(AuthContext)
    const [sellerLoading, setSellerLoading] = useState(false)



    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            return await fetch('https://bookish-server.vercel.app/users/sellers', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
        }
    })

    const handleDelete = seller => {
        setSellerLoading(true)
        fetch(`https://bookish-server.vercel.app/users/sellers/${seller._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setSellerLoading(false)
                if (data.acknowledged) {


                    setSellerLoading(false)
                    toast.success('Seller Deleted Successfully!');
                    refetch()


                }
            })
    }

    const handleVerify = (seller) => {
        setSellerLoading(true)
        fetch(`https://bookish-server.vercel.app/users/verify-seller/${seller.userName}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setSellerLoading(false);
                if (data.acknowledged) {
                    toast.success('Seller Verified!')
                    refetch()
                }
            })
    }


    return (
        <div>
            <h2 className='font-bold text-xl text-center py-4'>All Sellers {sellers.length}</h2>
            {isLoading && <Loading></Loading>}
            {sellerLoading && <Loading></Loading>}
            {loading && <Loading></Loading>}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, i) => <tr key={i} className="hover">
                                <th>{i + 1}</th>
                                <td>{seller.userName}</td>
                                <td>{seller.userEmail}</td>
                                <td><div className='flex flex-row gap-2'>{seller.isVerifiedSeller ? <button className='btn btn-disabled text-green-600'>Verified</button> : <Button onclickFunction={() => handleVerify(seller)} classes={'btn-outline'}>Verify Seller</Button>}<button onClick={() => handleDelete(seller)} className='btn bg-red-500 btn-outline'>Delete</button></div></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;