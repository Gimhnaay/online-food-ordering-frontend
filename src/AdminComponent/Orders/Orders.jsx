
import OrderTable from '../Orders/OrderTable';  

import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";


const orderStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "Completed", value: "COMPLETED" },
    { label: "All", value: "ALL" }
];

export const Orders = () => {
    const [filterValue, setFilterValue] = useState("ALL"); 


    const handleFilter = (e) => {
        setFilterValue(e.target.value); 
    };

    return (
        <div className="px-2">
            <Card className="p-5">
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                    Order Status
                </Typography>
                <FormControl>
                    <RadioGroup
                        onChange={handleFilter}  
                        row
                        name="category"
                        value={filterValue} 
                    >
                        {orderStatus.map((item) => (
                            <FormControlLabel
                                key={item.label}
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                                sx={{ color: "gray" }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Card>

           
            <OrderTable filterValue={filterValue} />
        </div>
    );
};
