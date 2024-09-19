import Home from "../component/Home/Home";
import React from "react";
import Profile from "../component/Profile/Profile";
import { Orders } from "../component/Profile/Order";
import { Navbar } from "../component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import RestaurantDetails from "../component/Restaurent/RestaurantDetails";
import Cart from "../component/Cart/Cart";
import UserProfile from "../component/Profile/UserProfile";
import { Auth } from "../component/Auth/Auth";

export const CustomerRoute = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/account/:register' element={<Home/>} />
                <Route path='/restaurent/:city/:title/:id' element={<RestaurantDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/my-profile/*' element={<Profile />} />
            </Routes>
            <Auth />
        </div>
    )
}
// /my-profile/orders  