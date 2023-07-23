import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../../Shared/Loading/Loading';

const ReportedItems = () => {
    const [isReportLoading, setIsReportLoading] = useState(false)

    const {data: reportedItems= [], isLoading, refetch} = useQuery({
        queryKey : ['reported'],
        queryFn : async()=>{
            return await fetch('https://bookish-server.vercel.app/reportedProducts',{
                headers: {
                    authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => res.json())
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    const handleDelete = product =>{
        setIsReportLoading(true)
        fetch(`https://bookish-server.vercel.app/reportedProducts/${product._id}`,{
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=> res.json())
        .then(data => {
            setIsReportLoading(false)
            console.log(data)
            if(data.acknowledged){
                toast.success('Reported Items Deleted Successfully!')
                refetch()
            }
        })
    }

    return (
        <div>
            {isReportLoading && <Loading></Loading>}
            <h2 className='font-bold text-xl text-center py-4'>All Reported Items {reportedItems.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Reported Item</th>
                            <th>Seller Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItems.map((item, i) => <tr key={i} className="hover">
                                <th>{i + 1}</th>
                                <td>{item.bookName}</td>
                                <td>{item.sellerName}</td>
                                <td><button onClick={()=> handleDelete(item)} className='btn btn-outline bg-red-500'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedItems;