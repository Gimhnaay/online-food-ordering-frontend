import { Card, CardActions, CardContent, CardMedia, Icon, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = () => {
    return (
        <div>
            <Card xs={{ width: 345 }}>
                <CardMedia

                    sx={{ height: 345 }}
                    image="https://images.pexels.com/photos/5152572/pexels-photo-5152572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                <CardContent>
                    <Typography variant="h5">
                        The Rustic Spoon
                    </Typography>
                    <Typography variant="body2">
                        Join us this Friday for a relaxing JD night
                    </Typography>
                    <div className="py-2 space-y-2">
                        <p>{"Colombo 07"}</p>
                        <p className="text-sm text-blue-500">October 4th, 2024 10.00 PM</p>
                        <p className="text-sm text-red-500">October 5th, 2024 03.00 AM</p>
                    </div>
                </CardContent>

                {false && <CardActions>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    )
}