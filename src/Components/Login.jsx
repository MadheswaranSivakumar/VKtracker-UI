import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Alert, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../Images/logo.png';
import sideImage from '../Images/Login.png';
import { useNavigate } from 'react-router-dom';


const StyledMainContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    width: '100vw',  // Full width of the viewport
    height: '100vh', // Full height of the viewport
    margin: 0,       // Remove any default margin
    padding: 0,      // Remove any default padding
    backgroundImage: 'linear-gradient(to right, #ffffff, #00b0f0)', // Gradient background
    overflow: 'hidden', // Prevent scrolling
}));

const StyledContainer = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    marginRight: '120px',
    marginLeft: '100px'

}));

const ImageContainer = styled(Box)(({ theme }) => ({
    width: '50%', // Set width for the image container
    height: '100vh', // Full height image
    backgroundImage: `url(${sideImage})`, // Use the image as the background
    backgroundSize: 'cover', // Cover the entire container
    backgroundPosition: 'center', // Center the image
    marginRight: '70px',
    marginLeft: '50px',
    marginTop: '10px',
    marginBottom: '60px',
}));

const Logo = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
}));


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleLogin = async () => {
        setLoading(true); // Start loading
        setError(null);   // Clear previous errors

        try {
            // API call to login
            const response = await axios.post('http://127.0.0.1:5000/api/login', {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Store the token and stop loading
            setToken(response.data.access_token);
            localStorage.setItem('authToken', response.data.access_token);
            setLoading(false);

            // Trigger redirection
            setRedirect(true);

        } catch (error) {
            // Handle API errors and stop loading
            setError('Login failed. Check your credentials and try again.');
            setLoading(false); // Stop loading if error
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(username, password);
    };

    useEffect(() => {
        if (redirect) {
            navigate('/home');
        }
    }, [redirect, navigate]);

    return (

        <StyledMainContainer sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            {/* Left side image container */}
            <ImageContainer sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />

            {/* Right side login form container */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <StyledContainer component="main">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={logo} alt="Logo" style={{ width: '18%', height: 'auto', marginBottom: '16px' }} />
                        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                            Login
                        </Typography>
                        <Box component="form" sx={{ width: '100%', mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                            {loading && <Alert severity="info" sx={{ mb: 2 }}>Logging in, please wait...</Alert>}
                            {token && <Alert severity="success" sx={{ mb: 2 }}>Successfully Logged in! Redirecting...</Alert>}
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, py: 1.5 }}
                                onClick={handleLogin}
                                disabled={loading} // Disable the button while loading
                            >
                                {loading ? 'Loading...' : 'Sign In'}
                            </Button>
                        </Box>
                    </Box>
                </StyledContainer>
            </Box>
        </StyledMainContainer>

    );
};

export default Login;
