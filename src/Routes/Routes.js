import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import AllBuyers from "../Pages/Dashboard/Admin/AllBuyers/AllBuyers";
import AllSellers from "../Pages/Dashboard/Admin/AllSellers/AllSellers";
import ReportedItems from "../Pages/Dashboard/Admin/ReportedItems/ReportedItems";
import AllOrderOfBuyer from "../Pages/Dashboard/Buyer/AllOrdersOfBuyer/AllOrderOfBuyer";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AddAProduct from "../Pages/Dashboard/Seller/AddAProduct/AddAProduct";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts/MyProducts";
import EachCategoryProduct from "../Pages/EachCategoryProducts/EachCategoryProduct";
import Blogs from "../Pages/HomePage/Blogs/Blogs";
import PrivateRoute from '../Routes/PrivateRoute/PrivateRoute';
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute/AdminRoute";
import SellerRoute from "./SellerRoute/SellerRoute";
const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main/Main");
const { default: Home } = require("../Pages/HomePage/Home/Home");
const { default: Login } = require("../Pages/Login/Login");
const { default: SignUp } = require("../Pages/SignUp/SignUp");


const routes = createBrowserRouter([
    {
        path: '/',
        element : <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: ()=> fetch('https://bookish-server.vercel.app/category')
            },
            {
                path : '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><EachCategoryProduct></EachCategoryProduct></PrivateRoute>,
                loader : ({params}) => fetch(`https://bookish-server.vercel.app/category/${params.id}`,{
                    headers: {
                        authorization : `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            }
        ]
    },
    {
        path : '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children : [
            {
                path : '/dashboard/allBookings/',
                element: <PrivateRoute><AllOrderOfBuyer></AllOrderOfBuyer></PrivateRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({params})=> fetch(`https://bookish-server.vercel.app/bookings/${params.id}`,{
                    headers: {

                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
            },
            {
                path : '/dashboard/addaProduct',
                element : <SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/allBuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/allSellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/reportedItems',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            }
        ]
    }
])

export default routes;