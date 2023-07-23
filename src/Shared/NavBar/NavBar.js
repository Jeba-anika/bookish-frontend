import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import Button from '../Button/Button';
import { AiOutlineMenuFold } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext)

    const navBarItems = <>
        <li><Link to='/' className='btn btn-outline rounded-full btn-primary mr-2 '>Home</Link></li>
        {
            user?.email && <li><Link className='btn btn-outline rounded-full btn-primary mr-2' to='/dashboard'>Dashboard</Link></li>
        }
        <li><Link to='/blogs' className='btn btn-outline rounded-full btn-primary mr-2'>Blogs</Link></li>
        
    </>

    const handleLogOut = () => {
        logout()
            .then()
            .catch(err => console.log(err))
    }

    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content bg-secondary mt-3 p-2 shadow  rounded-box w-52">
                        {navBarItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl font-bold text-accent">BOOKISH</Link>
            </div>
            <div className="navbar-middle hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {navBarItems}
                </ul>
            </div>
            <div className='navbar-end'>
                {
                    user?.email && <p className='lg:mr-2 lg:block md:block hidden'>{user.displayName}</p>
                }
                {
                    user?.email ? <>
                        <div className="avatar">
                            <div className="w-12 mr-4 rounded-full">
                                {
                                    user?.photoURL ?
                                        <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                                            <img src={user?.photoURL} alt='' />
                                        </div>
                                        :
                                        <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                                            <img src="https://placeimg.com/192/192/people" alt=''/>
                                        </div>

                                }
                            </div>

                        </div>

                        <Button classes={'btn-sm'} onclickFunction={handleLogOut}><BiLogOutCircle className='text-2xl'></BiLogOutCircle></Button>
                        
                    </> :
                        <Button classes={"btn-accent"}><Link to='/login'>Login</Link></Button>
                }
            </div>

        </div>
    );
};

export default NavBar;