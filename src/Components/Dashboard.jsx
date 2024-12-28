import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, CssBaseline, Grid, Paper, Divider, IconButton, Card, CardContent, } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../Images/logo.png';
import logout from '../Images/Logout.png';
import CaseRegistration from './Dashboard_Component/CaseRegistration'
import GroupsIcon from '@mui/icons-material/Groups';
import { makeStyles } from '@mui/styles';


import { getGradientTextStyle, getInlineGradientTextStyle } from '../Utils/Style';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '20px',
    },
    gridItem: {
        padding: '20px',
        textAlign: 'center',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'translateY(-10px)',
        },
    },
    iconBox: {
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#97dff9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        // backgroundImage: 'linear-gradient(to right, #ffffff, #97dff9)',
        '&:hover': {
            backgroundColor: 'grey.200',  // MUI theme grey color
            color: 'primary.main',
            cursor: 'pointer',     // Primary color on hover
        },

    },
    icon: {
        fontSize: '40px',
        marginBottom: '10px',
        color: '#012e3f',
    },
    text: {
        fontSize: '18px',
        color: '#012e3f',
    },
}));



const Dashboard = () => {
    const classes = useStyles();
    const [selectedItem, setSelectedItem] = useState(null);

    const [isHovered, setIsHovered] = useState(false); // For hover effect
    const navigate = useNavigate();

    // const [isHovered, setIsHovered] = useState(false); // For hover effect

    // Handle mouse enter/leave for hover effect on image
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const handleClick = (item) => {
        setSelectedItem(item);
    };

    const menuItems = [
        {
            name: 'Case Registration',
            content: <div>Case Registration Content</div>, // Add content or leave blank if you don't want it to display
            component: <CaseRegistration />,
            icon:<GroupsIcon className={classes.icon} />
        },
        // {
        //     name: 'Case Update',
        // },
        // {
        //     name: 'Report Update',
        //     content: <div>Welcome to Home</div>,
        //     onClick: () => console.log('Employer Verification clicked'),
        // },
        // {
        //     name: 'Report Download',
        //     content: <div>Welcome to Home</div>,
        //     onClick: () => console.log('Employer Verification clicked'),
        // },
        // {
        //     name: 'Employer Verification',
        //     content: <div>Welcome to Home</div>,
        //     onClick: () => console.log('Employer Verification clicked'),
        // },
    ];

    const handleHomeClick = () => {
        navigate('/home');
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(to right, #ffffff, #00b0f0)' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        <a href="https://www.vknowlabs.com/" target="_blank" rel="noopener noreferrer">
                            <img src={logo} alt="Logo" style={{ height: 50, marginTop: "5px" }} />
                        </a>
                    </Typography>

                    <Typography variant="h6" sx={getGradientTextStyle}>
                        DASHBOARD
                    </Typography>

                    <div style={{ display: 'flex', alignItems: 'center' }}> {/* Flex container for alignment */}
                        <button
                            style={{
                                marginRight: '10px', // Space between the Home button and the Logout image
                                background: 'none',
                                border: 'none',
                                color: 'black', // Adjust color as needed
                                fontSize: '16px',
                                cursor: 'pointer',
                                textDecoration: isHovered ? 'brightness(0.8)' : 'none', // Example hover effect
                                transition: 'text-decoration 0.3s ease', // Smooth transition effect
                            }}
                            onClick={handleHomeClick} // Function to handle Home button click
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave} // Optional: Hover effect
                        >
                            Home
                        </button>

                        {/* Logout Image */}
                        <img
                            src={logout} // Replace with your image source
                            alt="Logout"
                            style={{
                                height: 40,  // Set height to match the icon size
                                marginTop: '0', // Align to the baseline
                                cursor: 'pointer',
                                filter: isHovered ? 'brightness(0.8)' : 'none', // Example hover effect
                                transition: 'filter 0.3s ease', // Smooth transition effect
                            }}
                            aria-label="Logout"
                            onClick={handleLogout}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    </div>
                </Toolbar>
            </AppBar>

            <main>
                {/* If no item is selected, show menu cards */}
                {!selectedItem ? (
                    <Box className={classes.root}>
                        <Grid container spacing={4}>
                            {menuItems.map((item, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Paper className={classes.gridItem} elevation={3}>
                                        <Box className={classes.iconBox} onClick={() => handleClick(item)}>
                                            {item.icon}
                                            <Typography className={classes.text}>{item.name}</Typography>
                                            {/* <Typography className={classes.text}>{item.content}</Typography> */}
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : (
                    // When a menu item is selected, display the selected item's component
                    <Box sx={{ padding: '10px', backgroundColor: '#ffffff' }}>
                        {selectedItem.component}
                    </Box>
                )}
            </main>

        </>
    );

};

export default Dashboard;