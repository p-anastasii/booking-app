import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const location = useLocation();
    const selectedCity = location.state?.selectedCity || "";

    useEffect(() => {
        axios.get("http://localhost:5000/hotels")
            .then((response) => {
                if (Array.isArray(response.data)) {
                    console.log("All Hotels Data:", response.data);
                    if (selectedCity) {
                        const filteredHotels = response.data.filter(hotel =>
                            hotel.city && hotel.city.toLowerCase() === selectedCity.toLowerCase()
                        );
                        console.log("Filtered Hotels:", filteredHotels);
                        setHotels(filteredHotels);
                    } else {
                        setHotels(response.data);
                    }
                } else {
                    console.error("Unexpected data format", response.data);
                }
            })
            .catch((error) => console.error("Error fetching hotels:", error));
    }, [selectedCity]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {selectedCity ? `Hotels in ${selectedCity}` : "All Hotels"}
            </Typography>
            {hotels.length > 0 ? (
                hotels.map((hotel) => (
                    <Card key={hotel.id} style={{ marginBottom: "10px" }}>
                        <CardContent>
                            <Typography variant="h6">{hotel.name}</Typography>
                            <Typography variant="body2">{hotel.address}</Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No hotels found.</Typography>
            )}
        </Container>
    );
};

export default Hotels;

