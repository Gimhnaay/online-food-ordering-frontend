// import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
// import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { createEvent } from "@testing-library/react";
// import dayjs from "dayjs";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createEventAction } from "../../component/Sate/Restaurant/Action";

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

// const initialValues={
//     image:"",
//     location:"",
//     name:"",
//     startedAt:null,
//     endsAt:null
// }

// export const Events = () => {

//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const [formValues,setFormValues]=React.useState(initialValues);
//     const dispatch = useDispatch();
//     const jwt=localStorage.getItem("jwt");
//     const {restaurant}=useSelector(store=>store)  

//     const handleSubmit=(e)=>{
//         e.preventDefault()
//         console.log("submit",formValues);
//         dispatch(createEventAction({
//             data:formValues,
//             restaurantId:restaurant.usersRestaurant?.id,
//             jwt
//         })
//         );
//         setFormValues(initialValues)
//     };

//     const handleFormChange = (e) =>{
//         setFormValues({...formValues,[e.target.name]:e.target.value});
//     }

//     const handleDateChange=(date,dateType)=>{
//         // const formatedDate = dayjs(date).format("MMMM DD,YYYY hh:mm A");
//          //setFormValues({...formValues,[dateType]:formatedDate})
//         setFormValues({...formValues,[dateType]:date})
//     }

//     return (
//         <div>
//             <div className="p-5">
//                 <Button onClick={handleOpen} variant="contained">
//                     Create New Event
//                 </Button>

//                 <Modal
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="modal-modal-title"
//                     aria-describedby="modal-modal-description"
//                 >
//                     <Box sx={style}>
//                         <form onSubmit={handleSubmit}>
//                             <Grid container spacing={3}>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                     name="image"
//                                     label="Image URL"
//                                     variant="outlined"
//                                     fullWidth
//                                     value={formValues.image}
//                                     onChange={handleFormChange}
//                                     />

//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                     name="location"
//                                     label="Location"
//                                     variant="outlined"
//                                     fullWidth
//                                     value={formValues.location}
//                                     onChange={handleFormChange}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                     name="name"
//                                     label="Event Name"
//                                     variant="outlined"
//                                     fullWidth
//                                     value={formValues.name}
//                                     onChange={handleFormChange}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                         <DateTimePicker
//                                         renderInput={(props) => <TextField {...props} />}
//                                         label="Start Date and Time"
//                                         value={formValues.startedAt}
//                                         onChange={(newValue) => handleDateChange(newValue,"startedAt")
//                                         }
//                                         inputFormat="MM/dd/yyyy hh:mm a"
//                                         className="w-full"
//                                         sx={{width: "100%"}}
//                                         />
//                                     </LocalizationProvider>

//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                         <DateTimePicker
//                                         renderInput={(props) => <TextField {...props} />}
//                                         label="End Date and Time"
//                                         value={formValues.endsAt}
//                                         onChange={(newValue)=> 
//                                             handleDateChange(newValue,"endsAt")
//                                         }
//                                         inputFormat="MM/dd/yyyy hh:mm a"
//                                         className="w-full"
//                                         sx={{width: "100%"}}
//                                         />
//                                     </LocalizationProvider>

//                                 </Grid>

//                             </Grid>
//                             <Box mt={2}>
//                                     <Button variant="contained" color="primary" type="submit">
//                                         Submit
//                                     </Button>
//                             </Box>

//                         </form>
//                     </Box>
//                 </Modal>

//             </div>
//         </div>
//     )
// }

import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "../../component/Sate/Restaurant/Action";
import EventCard from "./EventCard";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const initialValues = {
    image: "",
    location: "",
    name: "",
    startedAt: null,
    endsAt: null
};

export const Events = () => {
    const [open, setOpen] = React.useState(false);
    const [formValues, setFormValues] = React.useState(initialValues);
    const [eventCards, setEventCards] = React.useState([]); // State to hold event cards
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);
    

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Load events from local storage when the component mounts
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setEventCards(storedEvents);
        
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createEventAction({
            data: formValues,
            restaurantId: restaurant.usersRestaurant?.id,
            jwt
        }));

        // Add the new event card to state and local storage
        const newEvents = [...eventCards, formValues];
        setEventCards(newEvents);
        localStorage.setItem("events", JSON.stringify(newEvents)); // Save to local storage
        setFormValues(initialValues);
        handleClose(); // Close the modal after submission
    };

    const handleFormChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date, dateType) => {
        setFormValues({ ...formValues, [dateType]: date });
    };

    const handleDeleteEvent = (index) => {
        const updatedEvents = eventCards.filter((_, i) => i !== index);
        setEventCards(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents)); // Update local storage
    };

    return (
        <div>
            <div className="p-5">
                <Button onClick={handleOpen} variant="contained">
                    Create New Event
                </Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="image"
                                        label="Image URL"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.image}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="location"
                                        label="Location"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.location}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        label="Event Name"
                                        variant="outlined"
                                        fullWidth
                                        value={formValues.name}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Start Date and Time"
                                            value={formValues.startedAt}
                                            onChange={(newValue) => handleDateChange(newValue, "startedAt")}
                                            inputFormat="MM/dd/yyyy hh:mm a"
                                            className="w-full"
                                            sx={{ width: "100%" }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="End Date and Time"
                                            value={formValues.endsAt}
                                            onChange={(newValue) => handleDateChange(newValue, "endsAt")}
                                            inputFormat="MM/dd/yyyy hh:mm a"
                                            className="w-full"
                                            sx={{ width: "100%" }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <Box mt={2}>
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Modal>
            </div>

            {/* Displaying event cards */}
            <div className="event-cards">
                <Typography variant="h4" style={{ marginTop: '2rem' }}>All Events</Typography>
                <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                    {eventCards.map((event, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <EventCard 
                                image={event.image}
                                location={event.location}
                                name={event.name}
                                startedAt={event.startedAt}
                                endsAt={event.endsAt}
                                onDelete={() => handleDeleteEvent(index)} // Pass delete function to EventCard
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default Events;
