import React, { useEffect } from "react";
import "./Home.css"
import MultiItemCarousel from "./MaltiItemCarousel";
import RestaurantCard from "../Restaurent/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../Sate/Restaurant/Action";
import { Navigate, useNavigate } from "react-router-dom";
import { findCart } from "../Sate/Cart/Action";


const restaurants=[1,1,1,1,1,1,1,1,1]

const Home = () => {
    const dispatch=useDispatch()
    const jwt=localStorage.getItem("jwt")
    const {restaurant} = useSelector(store => store)
    const navigate = useNavigate()

    console.log("restaurant",restaurant)

    useEffect(()=>{
        dispatch(getAllRestaurantsAction(jwt))
        
    },[])


    return (
        <div className="pb-10">
            <section className="banner -z-50 relative flex flex-col justify-center items-center">

                <div className="w-[50vw] z-10 text-center">

                    <p className="text-2xl lg:text-6xl font-bold z-10 py-5">Eazy Eats</p>
                    <p className="z-10 text-gray-300 text-xl lg:text-4xl">Order now and satisfy your cravings with just a few clicks!</p>
                </div>

                <div className="cover absolute top-0 left-0 right-0">

                </div> 
                <div className="fadout">

                </div>

            </section>
            <section className="p-10 lg:py-10 lg:px-20">
                <p className="text2xl font-semibold text-gray-400 py-3 pb-10">Top Meels</p>
                <MultiItemCarousel></MultiItemCarousel>
            </section>
            <section className="px-5 lg:px-20 pt-10">
                <h1 className="text-2xl font-semibold text-gray-400 py-8">
                Order From Our Top Picks And Taste The Best
                </h1>
                <div className="flex  flex-wrap items-center justify-around gap-5">
                    {
                        restaurant.restaurants.map((item)=><RestaurantCard item={item}/>)
                    }
                    
                </div>
            </section>

        </div>
    )
}

export default Home
