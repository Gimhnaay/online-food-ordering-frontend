

import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CartItem } from './CartItem';
import { AddressCard } from './AddressCard';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from "../Sate/Order/Action";

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

const initialValues = {
    streetAddress: "",
    city: "",
    state: "",
    pincode: ''
}

const Cart = () => {
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


    const handleSubmit = (values) => {
        if (values.streetAddress) {
            const data = {
                jwt: localStorage.getItem("jwt"),
                order: {
                    restaurantId: cart.cartItems[0].food?.restaurant.id,
                    deliveryAddress: {
                        fullName: auth.user?.fullName,
                        streetAddress: values.streetAddress,
                        city: values.city,
                        state: values.state,
                        postalCode: values.pincode,
                        country: "Sri Lanka"
                    }
                }
            };
            dispatch(createOrder(data));
            handleClose();
        } else {
            alert("Street address is required.");
        }
    }

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {cart.cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}

                    <Divider />
                    <div className='billDetails px-5 text-sm'>
                        <p font-extralight py-5>Bill Details</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item Total</p>
                                <p>Rs.{parseFloat(total).toFixed(2)}</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Deliver Fee</p>
                                <p>Rs.300.00</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>GST and Restaurant Charges</p>
                                <p>Rs.100.00</p>
                            </div>
                            <Divider />
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Total pay</p>
                            <p>Rs.{parseFloat(total + 100.00 + 300.00).toFixed(2)}</p>
                        </div>
                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%]  flex justify-center pb-10 lg:pb-0'>
                    
                    
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
                                        showButton={true} 
                                    />
                                ))
                        ) : (
                            <p>No addresses available.</p>
                        )}

                        <Card className="flex h-20 gap-10 w-64 p-5">
                            <AddLocationAltIcon />
                            <div className='space-y-3 text-gray-500'>
                                <h1 className='font-semibold text-lg text-white'>
                                    <Button variant='outlined' fullWidth onClick={() => setOpen(true)}>
                                        Add
                                    </Button>
                                </h1>
                            </div>
                        </Card>
                    </div>
                
                    
                </section>




            </main>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik initialValues={initialValues}
                        onSubmit={handleSubmit}>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="streetAddress"
                                        label="Street Address"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="city"
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="state"
                                        label="State"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="pincode"
                                        label="Pincode"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' type="submit" color="primary">
                                        Deliver Here
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    );
}

export default Cart;
