import React, { useState } from "react";
import { HiOutlineHeart, HiOutlineUser, HiShoppingCart } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../assets/logo_without_background.png";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";

const navigation = [
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Orders', href: '/orders'},
    {name: 'Cart Page', href: '/cart'},
    {name: 'Checkout', href: '/checkout'},
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    console.log(isDropdownOpen);

    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log(cartItems)

    const currentUser = false;
    return (
        <header className="max-w-screen-2xl mx-auto px-4">
            <nav className="flex justify-between items-center py-4">
                {/* left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-8 size-6" />
                    </Link>

                    <div className="relative sm-w-72 w-40 space-x-2">
                        <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
                        <input
                            type="text"
                            placeholder="Search Here"
                            className="bg-gray-100 w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                {/* right side */}
                <div className="relative flex items-center space-x-2 md:space-x-3">
                    <div>
                    {
                            currentUser ? <>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                            </button>
                            {/* show dropdowns */}
                            {
                                isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {
                                                navigation.map((item) => (
                                                    <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                        <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                            </> : 
                                <Link to="/login"> <HiOutlineUser className="size-6" /></Link>
                            
                        }
                    </div>

                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6" />
                    </button>

                    <Link
                        to="/cart"
                        className="bg-purple-100 px-2 rounded-full flex items-center space-x-1 rounded-md"
                    >
                        <HiShoppingCart className="size-6" />
                        {
                            cartItems.length > 0 ?
                                <span className="text-sm font-semibold">{cartItems.length}</span> : <span className="text-sm font-semibold">0</span>
                            
                        }
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;