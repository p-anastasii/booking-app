import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem, Container, Typography, CircularProgress, Paper } from "@mui/material";
import axios from "axios";

const Main = () => {
    const [destinations, setDestinations] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:5000/hotels")
            .then((response) => {
                if (Array.isArray(response.data)) {
                    const uniqueCities = [...new Set(response.data.map((hotel) => hotel.city))];
                    setDestinations(uniqueCities.map((city, index) => ({ id: index, name: city })));
                } else {
                    console.error("Unexpected data format", response.data);
                }
            })
            .catch((error) => console.error("Error fetching destinations:", error))
            .finally(() => setLoading(false));
    }, []);

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
                            destinations.map((city) => (
                                <MenuItem key={city.id} value={city.name}>{city.name}</MenuItem>
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



