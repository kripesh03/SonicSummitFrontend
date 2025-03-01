import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";


import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";

import footerLogo  from "../assets/logo_without_background.png"


const navigation = [
    {name: "Dashboard", href:"/user-dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
  
    const handleLogOut = () => {
        // Remove token from localStorage and redirect
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* Left Side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <img src={footerLogo} alt="Logo" className="w-36"/>
                    </Link>

                    {/* Search Input */}
                    <div className="relative sm:w-72 w-40 space-x-2">
                        <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
                        <input 
                            type="text" 
                            placeholder="Search here" 
                            className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                        />
                    </div>

                    <div className="relative sm:w-72 w-40 space-x-2">
                    {/* Enhanced Browse Link */}
                    <Link to="/browse" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm text-black hover: transition-all duration-300 ease-in-out transform hover:scale-105">
                        <span className="text-sm sm:ml-1 font-semibold">
                            Browse
                        </span>
                    </Link>
                    </div>
                </div>

                {/* Right Side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div>
                        {token ? (
                            <>
                                {/* User Avatar and Dropdown */}
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img 
                                        src={avatarImg} 
                                        alt="User Avatar" 
                                        className={`size-7 rounded-full ${token ? 'ring-2 ring-blue-500' : ''}`} 
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            // Show Login link when not logged in
                            <Link to="/login">
                                <HiOutlineUser className="size-6" />
                            </Link>
                        )}
                    </div>
                    
                    

                    {/* Cart Link */}
                    <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className="" />
                        <span className="text-sm font-semibold sm:ml-1">
                            {cartItems.length > 0 ? cartItems.length : 0}
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
