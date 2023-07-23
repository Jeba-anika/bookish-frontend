import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../Shared/Button/Button';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../../hooks/useToken/useToken';
import Loading from '../../Shared/Loading/Loading';

const Login = () => {
    const { login, googleLogin, loading } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [loginError, setLoginError] = useState('');
    const [token, tokenLoading] = useToken(loginUserEmail)
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)


    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true })
            
        }
    }, [token, from, navigate])


    const handleLogin = data => {
        setLoginError('')
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setLoginUserEmail(data.email)

            })
            .catch(err => {
                console.log(err)
                setLoginError(err.message)
            })
    }

    const signInwithGoogle = () => {
        setLoginError('')
        googleLogin()
            .then(result => {
                const user = result.user;
                console.log(user)
                setLoginUserEmail(user.email)


                const profile = {
                    userName: user.displayName,
                    userEmail: user.email,
                    userPhoto: user.photoURL,
                    role: 'Buyer'
                }
                setIsLoading(true)

                fetch('https://bookish-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(profile)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setIsLoading(false)
                    })
            })
            .catch(err => {
                console.log(err)
                setLoginError(err.message)
            })
    }

    return (
        <div className="hero">

            <div className="hero-content w-96 flex-col">
                <div className="text-center lg:text-left">
                    {loading && <Loading></Loading>}
                    {isLoading && <Loading></Loading>}
                    {tokenLoading && <Loading></Loading>}
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(handleLogin)}>
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
                            <div className="form-control mt-4">
                                <Button classes={'w-full rounded-full font-bold'}>Login</Button>
                            </div>
                        </form>
                        <p className='text-center'>Don't have an account? <Link to='/signup' className='text-primary font-bold'>SignUp</Link></p>
                        <div className="divider">OR</div>
                        <Button onclickFunction={signInwithGoogle} classes={'w-full rounded-full font-bold'}><FaGoogle className='mr-4'></FaGoogle>Sign in using GOOGLE</Button>
                        {loginError}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;