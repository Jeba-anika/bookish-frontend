import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { IoLocationSharp, IoTimeSharp } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import Button from '../../Shared/Button/Button';
import BookNowModal from './BookNowModal/BookNowModal';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const EachCategoryProduct = () => {
    debugger
    const { user } = useContext(AuthContext)
    const products = useLoaderData()
    const [productIndex, setProductIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(true)
    const [isReportLoading, setIsReportLoading] = useState(false)
    const navigation = useNavigation()

    if (navigation.state === 'loading') {
        return <Loading></Loading>
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const handleModalOpen = () => {
        setIsOpen(true)
    }

    const handleReport = (product) => {
        setIsReportLoading(true)
        fetch(`https://bookish-server.vercel.app/products/${product._id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setIsReportLoading(false)
                if (data.acknowledged) {
                    toast.success('Reported to admin!');
                }
            })
    }


    return (
        <div>
            <div className='lg:w-3/4 lg:mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    {
                        products.map((product, index) => <div key={product._id} className="hero border  border-primary rounded-xl">
                            <div className="hero-content flex-col lg:flex-row">
                                <img src={product.picture} alt='' className="w-96 rounded-lg shadow-2xl" />
                                <div>
                                    <h1 className="text-5xl font-bold">{product.bookName}</h1>
                                    <p>By <span className='text-accent'>{product.authorName}</span></p>
                                    <div className='flex flex-row gap-4 mt-3'>
                                        <div className='border-2 p-2 rounded-xl border-primary '>
                                            <p>Resale Price:</p>
                                            <p className='font-bold'>${product.resalePrice}</p>
                                        </div>
                                        <div className='border-2 p-2 rounded-xl border-primary '>
                                            <p>Original Price:</p>
                                            <p className='font-bold'>${product.originalPrice}</p>

                                        </div>

                                    </div>
                                    <p className="py-6">{product.about}</p>

                                    <p className='flex flex-row gap-2'><IoTimeSharp></IoTimeSharp>Years of Use: {product.yearsOfUse}</p>
                                    <p>Posting Time: {product.postedTime}</p>

                                    <div className='my-4 border border-accent w-1/2 p-4 rounded-xl'>
                                        <p className='font-bold'>Seller Info:</p>

                                        <p className='flex flex-row'>{product.isVerifiedSeller && <span className="tooltip text-blue-700" data-tip="Verified"><MdVerified></MdVerified></span>}{product.sellerName}</p>
                                        <p className='flex flex-row gap-1'><IoLocationSharp></IoLocationSharp>Location: {product.location}</p>
                                    </div>
                                    {
                                        product.paid ? <p className='font-bold text-xl'>SOLD OUT</p> : <div className='flex flex-row gap-4'><label htmlFor="bookNowModal" className='btn bg-gradient-to-r from-accent to-primary' onClick={() => { setProductIndex(index); handleModalOpen() }}>Book Now</label><button onClick={() => handleReport(product)} className='btn bg-red-500 btn-outline'>Report to Admin</button></div>
                                    }
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>


            {
                isOpen &&
                <BookNowModal
                    user={user}
                    product={products[productIndex]}
                    onClose={onClose}
                    handleModalOpen={handleModalOpen}
                ></BookNowModal>

            }
        </div>
    );
};

export default EachCategoryProduct;