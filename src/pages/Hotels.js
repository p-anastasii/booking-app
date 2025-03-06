import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { useLocation } from "react-router-dom";
import { fetchHotelsRequest } from "../store/hotelsSlice";

const Hotels = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const selectedCity = location.state?.selectedCity || "";
    const hotels = useSelector((state) => state.hotels.hotels);

    useEffect(() => {
        if (selectedCity) {
            dispatch(fetchHotelsRequest(selectedCity));
        }
    }, [dispatch, selectedCity]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {selectedCity ? `Hotels in ${selectedCity}` : "All Hotels"}
            </Typography>
            {hotels.map((hotel) => (
                <Card key={hotel.id} style={{ marginBottom: "10px" }}>
                    <CardContent>
                        <Typography variant="h6">{hotel.name}</Typography>
                        <Typography variant="body2">{hotel.address}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default Hotels;

