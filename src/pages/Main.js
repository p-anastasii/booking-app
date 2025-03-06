import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem, Container, Typography, CircularProgress, Paper } from "@mui/material";
import { fetchDestinationsRequest } from "../store/hotelsSlice";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const destinations = useSelector((state) => state.hotels.destinations);
    const loading = useSelector((state) => state.hotels.loading);
    const [selectedDestination, setSelectedDestination] = useState("");

    useEffect(() => {
        dispatch(fetchDestinationsRequest());
    }, [dispatch]);

    const handleSubmit = () => {
        if (!selectedDestination) {
            alert("Please select a destination");
            return;
        }
        navigate("/hotels", { state: { selectedCity: selectedDestination } });
    };

    return (
        <Container sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
            <Paper elevation={3} sx={{ p: 4, width: "400px", textAlign: "center" }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>Travel With Booking</Typography>
                {loading ? <CircularProgress /> : (
                    <TextField
                        select
                        label="Choose Destination"
                        value={selectedDestination}
                        onChange={(e) => setSelectedDestination(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    >
                        {destinations.length > 0 ? (
                            destinations.map((city, index) => (
                                <MenuItem key={index} value={city}>{city}</MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No destinations available</MenuItem>
                        )}
                    </TextField>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2, width: "100%" }}
                    disabled={!selectedDestination}
                >
                    Search Hotels
                </Button>
            </Paper>
        </Container>
    );
};

export default Main;




