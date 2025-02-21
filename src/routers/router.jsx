import { createBrowserRouter } from "react-router-dom"
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/products/CartPage";
import CheckoutPage from "../pages/products/CheckoutPage";
import SingleProduct from "../pages/products/SingleProduct";
import OrderPage from "../pages/products/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";


const router= createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children: [
            {
                path: '/',
                element : <Home/>
            },
            {
                path : '/orders',
                element: <OrderPage/>
            },
            {
                path : '/about',
                element: <div>About</div>
            }
            ,
            {
                path : '/login',
                element: <Login/>
            }
            ,
            {
                path : '/register',
                element: <Register/>
            },
            {
                path : '/cart',
                element: <CartPage/>
            },
            {
                path : '/checkout',
                element: <CheckoutPage/>
            },

            {
                path : '/products/:id',
                element: <SingleProduct/>
            },
            
        ]
    },

    {
        path: '/admin',
        element: <AdminLogin/>
    },

    {
        path: '/dashboard',
        element: <AdminRoute> <div>Admin Dashboard </div> </AdminRoute>,
        children: [
            {path: '', element: <AdminRoute> <div>Admin Dashboard </div> </AdminRoute>},
            {path: 'add-new-product', element: <AdminRoute> <div>Add New Product</div> </AdminRoute>},
            {path: 'edit-product/:id', element: <AdminRoute> <div>Edit Product</div> </AdminRoute>},
            {path: "manage-product" , element: <AdminRoute> <div>Manage Product</div> </AdminRoute>},
        ]
    }
])

export default router;