import React, { useState } from "react";
import { Divider, FormControl, Grid, RadioGroup, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Radio from '@mui/material/Radio';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuCard from "./MenuCard";

const categories = [
    "pizza",
    "pasta",
    "burger",
    "sushi"
]

const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian only", value: "vegetarian" },
    { label: "Non-Vegetarian", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" }
]

const menu=[1,1,1,1,1,1,1,1]

const RestaurantDetails = () => {

    const [FoodType, setFoodType]= useState("all");
    
    const handleFiltter=(e) =>{
        console.log(e.target.value, e.target.name)
    }

    return (
        <div className="px-5 lg:px-20">
            <section>
                <h3 className="text-gray-500 py-2 mt-10">
                    Home/Sri Lanka/fast food/3
                </h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>

                            <img className='w-full h-[40vh] object-cover'
                                src="https://images.pexels.com/photos/262918/pexels-photo-262918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="" />

                        </Grid>
                        <Grid item xs={12} lg={6}>

                            <img className='w-full h-[40vh] object-cover'
                                src="https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="" />

                        </Grid>
                        <Grid item xs={12} lg={6}>

                            <img className='w-full h-[40vh] object-cover'
                                src="https://images.pexels.com/photos/687824/pexels-photo-687824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="" />

                        </Grid>
                    </Grid>

                </div>
                <div className="pt-3 pb-5">
                    <h1 className="text-4xl font-semibold">
                        The Rustic Spoon
                    </h1>

                    <p className="text-gray-500 mt-1">
                        A welcoming retreat where classic comfort food meets contemporary dining. Our menu is filled with heartwarming favorites crafted with a twist, in a setting that feels like home.
                    </p>

                    <div className="space-y-3 mt-3">

                        <p className="text-gray-500 flex items-center gap-3">

                            <LocationOnIcon />
                            <span>
                                Colombo 07,
                                Sri Lanka
                            </span>
                        </p>

                        <p className="text-gray-500 flex items-center gap-3">
                            <CalendarTodayIcon />
                            <span>
                                Mon-Sun : 9:00 AM - 9:00 PM (Today)
                            </span>
                        </p>
                    </div>

                </div>
            </section>
            <Divider />
            <section className="pt-[2rem] lg:flex relative">

                <div className="space-y-10 lg:w-[20%] filter ">
                    <div className="box space-y-5 lg:sticky top-28">
                        
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Food Type
                            </Typography>

                            <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                <RadioGroup onChange={handleFiltter} name="food_type" value={FoodType}>
                                    {foodTypes.map((item) => (
                                    <FormControlLabel 
                                    key={item.value} 
                                    value={item.value} 
                                    control={<Radio />} 
                                    label={item.label} />))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider/>
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Food Category
                            </Typography>

                            <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                <RadioGroup onChange={handleFiltter} name="food_type" value={FoodType}>
                                    {categories.map((item) => (
                                    <FormControlLabel 
                                    key={item} 
                                    value={item} 
                                    control={<Radio />} 
                                    label={item} />))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div className="space-y-5 lg:w-[80%] lg:pl-10">
                    {menu.map((item)=><MenuCard/>)}
                </div>

            </section>
        </div>
    )
}

export default RestaurantDetails