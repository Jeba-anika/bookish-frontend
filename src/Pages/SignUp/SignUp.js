import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../Shared/Button/Button';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken/useToken';
import Loading from '../../Shared/Loading/Loading';

const SignUp = () => {
    const { createUser, updateUser, googleLogin, loading } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signupError, setSignupError] = useState('')
    const [signUpEmail, setsignUpEmail] = useState('')
    const [token, tokenLoading] = useToken(signUpEmail)
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)

    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        if (token) {
            console.log(token)
            navigate(from, { replace: true })
        }
    }, [token, from, navigate])

    const handleSignUp = data => {
        debugger
        setSignupError('')
        const email = data.email;
        const image = data.photo[0]
        const formData = new FormData();
        formData.append("image", image)
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                setIsLoading(true)
                fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(imgData => {
                        if (imgData.success) {
                            const img = imgData.data.url;
                            const user = {
                                userName: data.name,
                                userEmail: data.email,
                                userPhoto: img,
                                role: data.role
                            }
                            updateUser(data.name, img)
                                .then(() => {
                                    
                                    fetch('https://bookish-server.vercel.app/addUser', {
                                        method: 'POST',
                                        headers: {
                                            'content-type': 'application/json'
                                        },
                                        body: JSON.stringify(user)
                                    })
                                        .then(res => res.json())
                                        .then(data => {                                            
                                            console.log(data)
                                            if (data.acknowledged) {
                                                setsignUpEmail(email)
                                                setIsLoading(false)
                                                
                                            }

                                        })

                                })
                                .catch(err => {
                                    console.log(err)
                                    setSignupError(err.message)
                                })
                        }
                    })

            })
            .catch(err => {
                console.log(err)
                setSignupError(err.message)
            })
    }


    const signInwithGoogle = () => {
        setSignupError('')
        googleLogin()
            .then(result => {
                const user = result.user;
                console.log(user)
                setsignUpEmail(user.email)
                const profile = {
                    userName: user.displayName,
                    userEmail: user.email,
                    userPhoto: user.photoURL,
                    role: 'Buyer'
                }
                setIsLoading(true)

                fetch('https://bookish-server.vercel.app/addUser', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(profile)
                })
                    .then(res => res.json())
                    .then(data => {
                        setIsLoading(false)
                        console.log(data)
                    })

            })
            .catch(err => {
                console.log(err)
                setSignupError(err.message)
            })
    }

    return (
        <div className="hero">

            <div className="hero-content w-96 flex-col">
                <div className="text-center lg:text-left">
                    {loading && <Loading></Loading>}
                    {isLoading && <Loading></Loading>}
                    {tokenLoading && <Loading></Loading>}
                    <h1 className="text-5xl font-bold">SignUp</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: 'Name is required' })} type="text" placeholder="Name" className="input input-bordered" />
                                {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input {...register("photo", { required: 'Name is required' })} type="file" placeholder="Your Photo" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" />
                                {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: 'Email address is required' })} type="email" placeholder="Email" className="input input-bordered" />
                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: 'Password is required' })} type="password" placeholder="Password" className="input input-bordered" />
                                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                            </div>
                            <select {...register("role", { required: 'Choosing Option is required' })} className="select select-bordered w-full max-w-xs mt-4">
                                <option selected>Buyer</option>
                                <option >Seller</option>
                            </select>
                            <div className="form-control mt-4">
                                <Button classes={'w-full rounded-full font-bold'}>SignUp</Button>
                            </div>
                        </form>
                        <p className='text-center'>Already have an account? <Link to='/login' className='text-primary font-bold '>Login</Link></p>
                        <div className="divider">OR</div>
                        <Button onclickFunction={signInwithGoogle} classes={'w-full rounded-full font-bold'}><FaGoogle className='mr-4'></FaGoogle>Sign in using GOOGLE</Button>
                        {signupError}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;