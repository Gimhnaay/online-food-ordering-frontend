import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = ({ image, location, name, startedAt, endsAt, onDelete }) => { // Add onDelete prop
    return (
        <Card xs={{ width: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
            />
            <CardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body2">{location}</Typography>
                <div className="py-2 space-y-2">
                    <p className="text-sm text-blue-500">
                        {startedAt ? new Date(startedAt).toLocaleString() : "No Start Date"}
                    </p>
                    <p className="text-sm text-red-500">
                        {endsAt ? new Date(endsAt).toLocaleString() : "No End Date"}
                    </p>
                </div>
            </CardContent>

            <CardActions>
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default EventCard;
