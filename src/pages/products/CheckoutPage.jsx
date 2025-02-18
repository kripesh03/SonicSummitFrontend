import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function CheckoutPage() {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isChecked, setIsChecked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const navigate = useNavigate();

    // Dummy user (Replace with actual user authentication)
    const currentUser = { email: "user@example.com" };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const onSubmit = (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: cartItems.map((item) => item._id),
            totalPrice: totalPrice
        };

        console.log("Order Placed:", newOrder);

        // Simulate order placement (You can replace this with an API call)
        alert("Order placed successfully!");
    };

    useEffect(() => {
        // Check if the user is logged in by checking the token in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login page if no token is found
            navigate("/login");
        } else {
            setIsLoggedIn(true);
        }
    }, [navigate]);

    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
                        <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                        <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="name">Full Name</label>
                                            <input
                                                {...register("name", { required: true })}
                                                type="text"
                                                id="name"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs">Full Name is required</p>}
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                type="text"
                                                id="email"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                disabled
                                                value={currentUser.email}
                                            />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input
                                                {...register("phone", { required: true })}
                                                type="number"
                                                id="phone"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                placeholder="+123 456 7890"
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs">Phone Number is required</p>}
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="address">Address / Street</label>
                                            <input
                                                {...register("address", { required: true })}
                                                type="text"
                                                id="address"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="city">City</label>
                                            <input
                                                {...register("city", { required: true })}
                                                type="text"
                                                id="city"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="country">Country</label>
                                            <input
                                                {...register("country", { required: true })}
                                                type="text"
                                                id="country"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="state">State / Province</label>
                                            <input
                                                {...register("state", { required: true })}
                                                type="text"
                                                id="state"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input
                                                {...register("zipcode", { required: true })}
                                                type="text"
                                                id="zipcode"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            />
                                        </div>

                                        <div className="md:col-span-5 mt-3">
                                            <div className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="billing_same"
                                                    className="form-checkbox"
                                                    checked={isChecked}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <label htmlFor="billing_same" className="ml-2">
                                                    I agree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shopping Policy.</Link>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <button
                                                type="submit"
                                                disabled={!isChecked}
                                                className={`py-2 px-4 rounded font-bold text-white transition ${isChecked ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                                            >
                                                Place an Order
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CheckoutPage;
