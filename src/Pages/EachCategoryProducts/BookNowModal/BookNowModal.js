import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import Button from '../../../Shared/Button/Button';

const BookNowModal = ({ user, product, onClose,handleModalOpen }) => {
    const {loading, setLoading} = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();



    const handleBookedProducts = (data) => {
        console.log(data)
        const bookedProduct = {
            productID: product._id,
            userName : user?.displayName,
            userEmail : user?.email,
            phone : data.phone,
            userLocation : data.location,
            bookedBookName: product.bookName,
            bookedBookPrice: product.resalePrice,
            productImg : product.picture
        }
        console.log(bookedProduct)
        fetch('https://bookish-server.vercel.app/bookings',{
            method : 'POST',
            headers: {
                'content-type' : 'application/json',
                authorization : `Bearer ${localStorage.getItem('accessToken')}`
            },
            body : JSON.stringify(bookedProduct)
        })
        .then(res => res.json())
        .then(data =>{
            setLoading(true)
            console.log(data)
            if(data.acknowledged){
                setLoading(false)
                onClose()
                toast.success('Successfully Booked!')
                
            }
        })

        
    }
    return (
        <div>
            <input type="checkbox" id="bookNowModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="bookNowModal" className="btn btn-sm btn-circle bg-accent absolute right-2 top-2" >✕</label>
                    <form onSubmit={handleSubmit(handleBookedProducts)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input value={user?.displayName} disabled type="text" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input value={user?.email} disabled type="text" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Book Name</span>
                            </label>
                            <input value={product.bookName} disabled type="text" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Resale Price</span>
                            </label>
                            <input value={`$${product.resalePrice}`} disabled type="text" placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input {...register("phone", { required: 'Phone number is required' })} type="number" placeholder="Phone Number" className="input input-bordered" />
                            {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Meeting Location</span>
                            </label>
                            <input {...register("location", { required: 'Meeting Location is required' })} type="text" placeholder="Meeting Location" className="input input-bordered" />
                            {errors.location && <p className='text-red-600'>{errors.location?.message}</p>}
                        </div>
                        <div className="form-control mt-4">
                            <Button classes={'w-full rounded-full font-bold'}>Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookNowModal;