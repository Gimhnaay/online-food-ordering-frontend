import { Avatar, Box, Button, Card, CardActions, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodAction, getMenuItemByRestaurantId, updateMenuItemsAvailability } from "../../component/Sate/Menu/Action";


export default function MenuTable() {
    const dispatch = useDispatch();
    const jwt=localStorage.getItem("jwt");
    const {restaurant,ingredients,menu}=useSelector(store=>store)
    const navigate=useNavigate();

    useEffect(()=>{
        dispatch(
        getMenuItemByRestaurantId(
            {jwt,
            restaurantId:restaurant.usersRestaurant.id,
            vegetarian:false,
            nonveg:false,
            seasonal:false,
            foodCategory:"",
        })
    ); 
    },[])

    const handleDeleteFood=(foodId)=>{
       dispatch(deleteFoodAction({foodId,jwt})) 
    }
    //////////////////
    const handleUpdateStoke = (foodId) =>{        
        dispatch(updateMenuItemsAvailability({foodId,jwt}))    
    }
    /////
    return (
        <Box>
            <Card className="mt-1">
                <CardHeader action={
                    <IconButton onClick={()=>navigate("/admin/restaurant/add-menu")} aria-label="settings">
                        <CreateIcon />
                    </IconButton>
                }
                    title={"Menu"}
                    sx={{ pt: 2, alignItems: "center" }}
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="right">Title</TableCell>
                                <TableCell align="right">Ingredients</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Avalabilty</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.menuItems.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                    <Avatar src={item.images[0]}></Avatar>
                                    </TableCell>
                                    <TableCell align="right">{item.name}</TableCell>
                                    <TableCell align="right">
                                        {item.ingredients.map((ingredient)=><Chip label={ingredient.name}/>)}
                                    </TableCell>
                                    <TableCell align="right">
                                    Rs.{parseFloat(item.price).toFixed(2)}
                                    </TableCell>
                                    {/* <TableCell align="right">{item.available?"in_stock":"out_of_stock"}</TableCell> */}
                                    <TableCell align="right">
                                        <Button onClick={()=>handleUpdateStoke(item.id)}>
                                            {item.available?"in_stock":"out_of_stock"}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={()=>handleDeleteFood(item.id)}>
                                            <Delete />
                                        </IconButton>  
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}