
import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder, updateOrderStatus } from "../../component/Sate/Restaurant Order/Action";

const orderStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Out For Delivery", value: "OUT FOR DELIVERY" }, // Ensure the value matches the backend
    { label: "Delivered", value: "DELIVERED" }
];

export default function OrderTable({ filterValue }) {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, restaurantOrder } = useSelector(store => store);

    const [anchorEl, setAnchorEl] = useState({}); // Track each order's anchor element separately

    const handleClick = (event, orderId) => {
        setAnchorEl((prev) => ({ ...prev, [orderId]: event.currentTarget })); // Set anchor element for specific order
    };

    const handleClose = (orderId) => {
        setAnchorEl((prev) => ({ ...prev, [orderId]: null })); // Close menu for specific order
    };

    useEffect(() => {
        dispatch(fetchRestaurantsOrder({
            jwt,
            restaurantId: restaurant.usersRestaurant?.id
        }));
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    const filteredOrders = restaurantOrder.orders.filter((order) => {
        if (filterValue === "ALL") return true;
        return order.orderStatus === filterValue;
    });

    const handleUpdateOrder = (orderId, orderStatus) => {
        dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
        handleClose(orderId); // Close the menu after updating
    };

    return (
        <Box>
            <Card className="mt-1">
                <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell align="right">Image</TableCell>
                                <TableCell align="right">Customer</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Ingredients</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="right">
                                        <AvatarGroup>
                                            {item.items.map((orderItem) => (
                                                <Avatar key={orderItem.id} src={orderItem.food?.images[0]} />
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.customer?.fullName}
                                    </TableCell>
                                    <TableCell align="right">Rs.{parseFloat(item.totalPrice).toFixed(2)}</TableCell>
                                    <TableCell align="right">
                                        {item.items.map((orderItem) => <p key={orderItem.id}>{orderItem.food?.name}</p>)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {item.items.map((orderItem) =>
                                            <div key={orderItem.id}>
                                                {orderItem.ingredients.map((ingredient, index) => <Chip key={index} label={ingredient} />)}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">{item.orderStatus}</TableCell>

                                    <TableCell align="right">
                                        <Button
                                            id={`basic-button-${item.id}`}
                                            aria-controls={anchorEl[item.id] ? `basic-menu-${item.id}` : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={anchorEl[item.id] ? 'true' : undefined}
                                            onClick={(event) => handleClick(event, item.id)} // Pass order ID to track which menu to open
                                        >
                                            Update
                                        </Button>
                                        <Menu
                                            id={`basic-menu-${item.id}`}
                                            anchorEl={anchorEl[item.id]}
                                            open={Boolean(anchorEl[item.id])} // Open menu for the specific order
                                            onClose={() => handleClose(item.id)} // Close menu for the specific order
                                            MenuListProps={{
                                                'aria-labelledby': `basic-button-${item.id}`,
                                            }}
                                        >
                                            {orderStatus.map((status) => (
                                                <MenuItem
                                                    key={status.value}
                                                    onClick={() => handleUpdateOrder(item.id, status.value)} // Update specific order
                                                >
                                                    {status.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
}
