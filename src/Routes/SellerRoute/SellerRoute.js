import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useSeller from '../../hooks/useSeller/useSeller';
import Loading from '../../Shared/Loading/Loading';

const SellerRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isSeller, isSellerLoading]= useSeller(user?.email)
    const location = useLocation()

    if(loading || isSellerLoading){
        return <Loading></Loading>
    }

    if(user && isSeller){
        return children
    }

    return <Navigate to='/' state={{from : location}} replace></Navigate>
};

export default SellerRoute;