import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import Loading from '../../../../Shared/Loading/Loading';

const AllBuyers = () => {
    const {userDelete, loading} = useContext(AuthContext)
    const [buyerLoading, setBuyerLoading] = useState(false)

   
    const { data: buyers = [] ,isLoading, refetch} = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            return await fetch('https://bookish-server.vercel.app/users/buyers',{
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
        }
    })

    const handleDelete = buyer =>{
        setBuyerLoading(true)
        fetch(`https://bookish-server.vercel.app/users/buyers/${buyer._id}`,{
            method: 'DELETE',
            headers: {
                authorization : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            if(data.acknowledged){
                
                    setBuyerLoading(false)
                    toast.success('Successfully Deleted!')
                    refetch()
            }
        })
    }

    return (
        <div>
            <h2 className='font-bold text-xl text-center py-4'>All buyers {buyers.length}</h2>
            {isLoading && <Loading></Loading>}
            {buyerLoading && <Loading></Loading>}
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
                            buyers.map((buyer, i) => <tr key={i} className="hover">
                                <th>{i+1}</th>
                                <td>{buyer.userName}</td>
                                <td>{buyer.userEmail}</td>
                                <td><button onClick={()=>handleDelete(buyer)} className='btn bg-red-500 btn-outline'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;