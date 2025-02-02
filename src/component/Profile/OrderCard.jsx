import { Button, Card } from "@mui/material";
import React from "react";

export const OrderCard = ({item,order}) =>{
    return(
        <div>
            <Card className="flex justify-between items-center p-5">
                <div className="flex items-center space-x-5">
                    <img 
                    className="h-16 w-16"
                    src={item.food.images[0]} 
                    alt=""
                    >
                    </img>
                    <div>
                        <p>
                        {item.food.name} 
                        </p>
                        <p>
                        Rs.{parseFloat(item.totalPrice).toFixed(2)}
                            
                        </p>
                    </div>

                </div>
                <div>
                    <Button className="cursor-not-allowed" >
                        {order.orderStatus}
                    </Button>
                </div>

            </Card>
        </div>
    )
}