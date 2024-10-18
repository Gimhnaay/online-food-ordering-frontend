
import React, { useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Sate/Authentication/Action";


const UserProfile = () => {
    const dispatch = useDispatch();
    const { user, jwt } = useSelector((state) => state.auth); 

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt)); 
        }
    }, [jwt, dispatch]);

    return (
        <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
            <div className='flex flex-col items-center justify-center'>
                <AccountCircleIcon sx={{ fontSize: "9rem" }} />
                <h1 className="py-5 text-2xl font-semibold">{user?.fullName || "Full Name"}</h1> 
                <p>Email: {user?.email || "Email"}</p>
            </div>
        </div>
    );
};

export default UserProfile;
