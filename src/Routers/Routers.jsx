import React from "react";
import { AdminRoute } from "./AdminRoute";
import { CustomerRoute } from "./CustomerRoute";
import { Route, Routes } from "react-router-dom";

const Routers = () => {
    return (
        <Routes>
            <Route path='/admin/restaurant/*' element={<AdminRoute/>}></Route>
            <Route path='/*' element={<CustomerRoute/>}></Route>

        </Routes>
    )
}

export default Routers