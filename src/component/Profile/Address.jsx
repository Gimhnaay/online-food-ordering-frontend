

import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from "../Sate/Order/Action";
import { AddressCard } from '../Cart/AddressCard';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
};



export const Address = () => {
    const [open, setOpen] = useState(false);
    const { cart, auth } = useSelector(store => store);
    const dispatch = useDispatch();

    const handleClose = () => setOpen(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (cart?.cartItems) {
            const newTotal = cart.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
            setTotal(newTotal);
        }
    }, [cart.cartItems]);

   const createOrderUsingSelectedAddress = (address) => {
    const data = {
        jwt: localStorage.getItem("jwt"),
        order: {
            restaurantId: cart.cartItems[0].food?.restaurant.id,
            deliveryAddress: {
                fullName: auth.user?.fullName,
                streetAddress: `${address.streetAddress}, ${address.city}, ${address.state}, ${address.postalCode}, Sri Lanka`
            }
        }
    };
    dispatch(createOrder(data));
    handleClose();
};



    return (
        <>
            <main className='lg:flex justify-between'>
                
                <section className='flex justify-center pb-10 lg:pb-0'>
                 
                    
                    <div className='flex gap-5 flex-wrap justify-center'>
                        {auth.user?.address && auth.user.address.length > 0 ? (
                            auth.user.address
                                .filter(address => address.streetAddress && address.city && address.state && address.postalCode) // Filter invalid addresses
                                .map((address) => (
                                    <AddressCard 
                                        key={address.id} 
                                        handleSelectAddress={createOrderUsingSelectedAddress} 
                                        item={{
                                            ...address,
                                            formattedAddress: `${address.streetAddress}, ${address.city}, ${address.state}, ${address.postalCode}, Sri Lanka`
                                        }} 
                                        
                                    />
                                ))
                        ) : (
                            <p>No addresses available.</p>
                        )}
                    </div>
                
                    
                </section>




            </main>
        </>
    );
}

