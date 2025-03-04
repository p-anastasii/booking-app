import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
            <Container>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>Booking App</Typography>
                    <Button color="inherit" component={Link} to="/">Main</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                    <Button color="inherit" component={Link} to="/hotels">Hotels</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
