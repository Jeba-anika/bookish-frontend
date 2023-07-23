import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from '../../Shared/NavBar/NavBar';
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { AuthContext } from '../../Contexts/AuthProvider';
import useSeller from '../../hooks/useSeller/useSeller';
import useAdmin from '../../hooks/useAdmin/useAdmin';
import { MdReport } from "react-icons/md";

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email)
    const [isAdmin] = useAdmin(user?.email)


    return (
        <div>
            <NavBar></NavBar>
            <div className='flex lg:flex-row md:flex-row sm:flex-col flex-col my-10 mx-auto'>
                <div className='lg:w-1/4 md:w-1/4 sm:w-full w-full '>
                    <ul className="menu menu-horizontal sm:menu-horizontal md:menu-vertical p-4 lg:menu-vertical bg-secondary rounded-box h-full">
                        <li><Link to='/dashboard/allBookings/'><div className="tooltip" data-tip="My Orders">
                            <><FaShoppingCart></FaShoppingCart></>
                        </div><span className='lg:block md:block hidden'>My Orders</span></Link></li>
                        {
                            isSeller && <>
                                <li><Link to='/dashboard/addaProduct'>Add a product</Link></li>
                                <li><Link to='/dashboard/myproducts'>My products</Link></li>
                            </>
                        }
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/allBuyers'><div className="tooltip" data-tip="All Buyers">
                                    <><FaUsers></FaUsers></>
                                </div><span className='lg:block md:block hidden'>All Buyers</span></Link></li>
                                <li><Link to='/dashboard/allSellers'><div className="tooltip" data-tip="All Sellers">
                                    <><FaUsers></FaUsers></>
                                </div><span className='lg:block md:block hidden'>All Sellers</span></Link></li>
                                <li><Link to='/dashboard/reportedItems'><div className="tooltip" data-tip="Reported Items">
                                    <><MdReport></MdReport></>
                                </div><span className='lg:block md:block hidden'>Reported Items</span></Link></li>
                            </>
                        }
                    </ul>
                </div>
                <div className='lg:w-3/4 md:w-3/4 sm:w-full w-full'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;