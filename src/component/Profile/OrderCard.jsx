import { Button, Card } from "@mui/material";
import React from "react";

export const OrderCard = () =>{
    return(
        <div>
            <Card className="flex justify-between items-center p-5">
                <div className="flex items-center space-x-5">
                    <img 
                    className="h-16 w-16"
                    src="https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt=""
                    >
                    </img>
                    <div>
                        <p>
                            Pizza
                        </p>
                        <p>
                            Rs.456.00
                        </p>
                    </div>

                </div>
                <div>
                    <Button className="cursor-not-allowed" >
                        completed
                    </Button>
                </div>

            </Card>
        </div>
    )
}