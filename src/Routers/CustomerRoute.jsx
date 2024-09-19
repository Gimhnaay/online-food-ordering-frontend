import { Home } from "@mui/icons-material";
import React from "react";
import Profile from "../component/Profile/Profile";
import { Orders } from "../component/Profile/Order";
import { Navbar } from "../component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import RestaurantDetails from "../component/Restaurent/RestaurantDetails";
import Cart from "../component/Cart/Cart";

export const CustomerRoute = () => {
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/account/:register' element={<Orders/>}/>
                <Route path='/restaurent/:city/:title/:id' element={<RestaurantDetails/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/my-profile/*' element={<Profile/>}/>
            </Routes>
        </div>
    )
}
// /my-profile/orders