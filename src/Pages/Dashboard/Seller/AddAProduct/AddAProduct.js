import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../../Shared/Button/Button';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Contexts/AuthProvider';

const AddAProduct = () => {
    const {user} = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://bookish-server.vercel.app/category')
            .then(function (response) {
                console.log(response.data);
                setCategories(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const handleAddProduct = (data) => {
        const bookName = data.bookName;
        const authorName = data.authorName;
        const originalPrice = data.originalPrice;
        const resalePrice = data.resalePrice;
        const category = data.category.split('. ')[0];
        const condition = data.condition;
        const  location = data.location;
        const phone = data.phone
        const yearOfPurchase = data.yearOfPurchase
        const yearsOfUse = data.yearsOfUse
        const about = data.about
        const date = new Date()
        const postedTime = format(date, 'PPpp')

        const image = data.photo[0]
        const formData = new FormData();
        formData.append("image", image)

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const picture = imgData.data.url;
                    axios.post('https://bookish-server.vercel.app/products', {
                        categoryId: category,
                        isSold: false,
                        isVerifiedSeller: false,
                        bookName,
                        authorName,
                        resalePrice,
                        originalPrice,
                        yearsOfUse,
                        yearOfPurchase,
                        location,
                        condition,
                        postedTime,
                        phone,
                        about,
                        picture,
                        sellerName: user?.displayName,
                        email : user?.email
                    },{
                        headers: {
                            authorization : `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                    .then(res => {
                        console.log(res.data.acknowledged);
                        if(res.data.acknowledged){
                            toast.success('Your Product is added')
                            navigate('/dashboard/myproducts')
                        }
                    })
                    .catch(err => console.log(err))

                }
            })
        console.log(data, category, postedTime)

    }

    return (
        <div className="hero">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Add a Product</h1>
                </div>
                <div className="card flex-shrink-0 w-full shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleAddProduct)}>
                            <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col gap-4'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Book Name</span>
                                    </label>
                                    <input {...register("bookName", { required: 'Book Name is required' })} type="text" placeholder="Book Name" className="input input-bordered" />
                                    {errors.bookName && <p className='text-red-600'>{errors.bookName?.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Author Name</span>
                                    </label>
                                    <input {...register("authorName", { required: 'Author Name is required' })} type="text" placeholder="Author Name" className="input input-bordered" />
                                    {errors.authorName && <p className='text-red-600'>{errors.authorName?.message}</p>}
                                </div>

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upload an Image</span>
                                </label>
                                <input {...register("photo", { required: 'Name is required' })} type="file" placeholder="Your Photo" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                                {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>}
                            </div>

                            <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col gap-4'>
                                <div className="form-control lg:w-1/2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Original Price</span>
                                    </label>
                                    <input {...register("originalPrice", { required: 'Original Price is required' })} type="number" placeholder="Book Original Price" className="input input-bordered" />
                                    {errors.originalPrice && <p className='text-red-600'>{errors.originalPrice?.message}</p>}
                                </div>
                                <div className="form-control lg:w-1/2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Resale Price</span>
                                    </label>
                                    <input {...register("resalePrice", { required: 'Resale Price is required' })} type="number" placeholder="Book Resale Price" className="input input-bordered" />
                                    {errors.resalePrice && <p className='text-red-600'>{errors.resalePrice?.message}</p>}
                                </div>
                            </div>

                            <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col gap-4'>
                                <div className='lg:w-1/2 md:w-1/2'>
                                    <select {...register("category", { required: 'Choosing Category is required' })} className="select select-bordered w-full max-w-xs mt-4">
                                        {
                                            categories.map(category => <option key={category.id}>{category.id}. {category.name}</option>)
                                        }
                                    </select>
                                    {errors.category && <p className='text-red-600'>{errors.category?.message}</p>}
                                </div>
                                <div className='lg:w-1/2 md:w-1/2'>
                                    <select {...register("condition", { required: 'Your Book Condition is required' })} className="select select-bordered w-full max-w-xs mt-4">
                                        <option selected>Excellent</option>
                                        <option >Good</option>
                                        <option >Fair</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col gap-4'>
                                <div className="form-control lg:w-1/2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Location</span>
                                    </label>
                                    <input {...register("location", { required: 'Location is required' })} type="text" placeholder="Location" className="input input-bordered" />
                                    {errors.location && <p className='text-red-600'>{errors.location?.message}</p>}
                                </div>
                                <div className="form-control lg:w-1/2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input {...register("phone", { required: 'Phone Number is required' })} type="text" placeholder="Phone Number" className="input input-bordered" />
                                    {errors.phone && <p className='text-red-600'>{errors.phone?.message}</p>}
                                </div>
                            </div>

                            <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col gap-4'>
                                <div className="form-control lg:w-1/2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Year of Purchase</span>
                                    </label>
                                    <input {...register("yearOfPurchase", { required: 'Original Price is required' })} type="number" placeholder="Year of Purchase" className="input input-bordered" />
                                    {errors.yearOfPurchase && <p className='text-red-600'>{errors.yearOfPurchase?.message}</p>}
                                </div>
                                <div className="form-control lg:w-1/2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Years of use</span>
                                    </label>
                                    <input {...register("yearsOfUse", { required: 'Years of use is required' })} type="number" placeholder="Years of use" className="input input-bordered" />
                                    {errors.yearsOfUse && <p className='text-red-600'>{errors.yearsOfUse?.message}</p>}
                                </div>
                            </div>

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea {...register("about", { required: 'Description is required' })} className="textarea textarea-bordered" placeholder="Write description of the book"></textarea>
                                {errors.about && <p className='text-red-600'>{errors.about?.message}</p>}
                            </div>

                            <div className="form-control mt-4">
                                <Button classes={'w-full rounded-full font-bold'}>Add Product</Button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAProduct;