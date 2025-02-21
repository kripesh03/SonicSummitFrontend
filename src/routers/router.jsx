import { createBrowserRouter } from "react-router-dom"
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/products/CartPage";
import CheckoutPage from "../pages/products/CheckoutPage";
import SingleProduct from "../pages/products/SingleProduct";
import OrderPage from "../pages/products/OrderPage";


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
])

export default router;