import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import Button from '../../../../Shared/Button/Button';
import Loading from '../../../../Shared/Loading/Loading';

const MyProducts = () => {
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const [productIndex, setProductIndex] = useState(0)
    


    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['myProducts', user?.email],
        queryFn: () => {
            return fetch(`https://bookish-server.vercel.app/products?email=${user.email}`,{
                headers: {
                    authorization : `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
        }
    })

    

    const makeAvailableProduct = id=>{
        setLoading(true)
        fetch(`https://bookish-server.vercel.app/products/${id}`,{
            method: 'PUT',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            setLoading(false)
            console.log(data)
            if(data.modifiedCount>0){   
                             
                toast.success('Your Product is available again!')
                refetch()
                
            }
        })
    }


    const handleAdvertise = (product)=>{
        setLoading(true)
        fetch(`https://bookish-server.vercel.app/product-advertise/${product._id}`,{
            method: 'PUT',
            headers: {
                authorization : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=> res.json())
        .then(data =>{
            setLoading(false)
            console.log(data)
            if(data.modifiedCount > 0){
                toast.success('Your Product is up for advertisement!')
                refetch()
            }
        })
    }


    const deleteProduct = product => {
        setLoading(true)
        console.log(product.bookName)
        fetch(`https://bookish-server.vercel.app/products/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                if(data.acknowledged){
                    
                    toast.success("Deleted Successfully")
                    refetch()
                }
            })
    }


    return (
        <div>
            <h2 className='font-bold text-2xl py-2 text-center'>My products : {products.length}</h2>
            {isLoading && <Loading></Loading>}
            
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                {
                    products.map((product, index) => <div>
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <figure><img className='w-40' src={product.picture} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.bookName}</h2>
                                <p>Resale Price : <span className='text-xl text-secondary font-bold'>${product.resalePrice}</span></p>
                                <p>Sales Status: {product.paid ? <span className='font-bold text-xl'>Sold</span> : <span className='font-bold text-xl'>Available</span>}</p>
                                <div className="card-actions justify-end">
                                    {
                                        product.paid ? <>
                                        {loading && <Loading></Loading>}
                                        <Button onclickFunction={()=>makeAvailableProduct(product._id)} classes={'btn-outline'}>Make This Item Available</Button>
                                        </> :
                                            <>
                                                {loading && <Loading></Loading>}
                                                { !product.advertise && <Button onclickFunction={()=> handleAdvertise(product)} classes={'btn-outline'}>Advertise</Button>}
                                                <label onClick={()=> setProductIndex(index)} htmlFor="delete-modal" className="btn bg-red-500 btn-outline">Delete</label>

                                            </>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>)
                }
            </div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="delete-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Are you sure you want to delete your product?</h3>
                    <p className="py-4">Once deleted , you can not undo it.</p>
                    <button onClick={() => deleteProduct(products[productIndex])} className='btn bg-red-500 btn-outline'>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default MyProducts;