import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, CssBaseline, Grid,  Paper } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';
import logo from '../Images/logo.png';
import logout from '../Images/Logout.png';

import { makeStyles } from '@mui/styles';


import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import DonutSmallSharpIcon from '@mui/icons-material/DonutSmallSharp';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import CampaignIcon from '@mui/icons-material/Campaign';
import MessageIcon from '@mui/icons-material/Message';
import LinkIcon from '@mui/icons-material/Link';
import UpcomingSharpIcon from '@mui/icons-material/UpcomingSharp';
// import TaskAltIcon from '@mui/icons-material/TaskAlt';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import MailIcon from '@mui/icons-material/Mail';
// import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PeopleIcon from '@mui/icons-material/People';
// import AssignmentIcon from '@mui/icons-material/Assignment';


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


const Home = () => {

    const classes = useStyles();
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const items = [
        { name: 'Dashboard',  icon:<DashboardSharpIcon className={classes.icon} />},
        { name: 'Project Tracker', icon: <DonutSmallSharpIcon  className={classes.icon} /> },
        { name: 'Calendar', icon: <CalendarIcon  className={classes.icon} /> },
        { name: 'Activity', icon: <CampaignIcon  className={classes.icon} /> },
        { name: 'Messages', icon: <MessageIcon  className={classes.icon} /> },
        { name: 'Updates', icon: <UpcomingSharpIcon  className={classes.icon} /> },
        // { name: 'Desk', icon: <TaskAltIcon className={classes.icon} /> },
        // { name: 'Invoice', icon: <ReceiptIcon className={classes.icon} /> },
        // { name: 'Mail', icon: <MailIcon className={classes.icon} /> },
        // { name: 'Meeting', icon: <MeetingRoomIcon className={classes.icon} /> },
        { name: 'People', icon: <PeopleIcon className={classes.icon} /> },
        // { name: 'Projects', icon: <AssignmentIcon className={classes.icon} /> },
    ];

    const routePage = (name) => {
        if (name === 'Dashboard') {
            navigate('/dashboard');
        }
        if (name === 'People') {
            navigate('/peoples')
        }

    }

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
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

                    <div>
                        <img
                            src={logout} // Replace with your image source
                            alt="Logout"
                            style={{
                                height: 50,
                                marginTop: '5px',
                                cursor: 'pointer',
                                filter: isHovered ? 'brightness(0.8)' : 'none', // Example hover effect
                                transition: 'filter 0.3s ease' // Smooth transition effect
                            }}
                            aria-label='Logout'
                            onClick={handleLogout}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    </div>
                </Toolbar>
            </AppBar>


            <Box className={classes.root}>
                <Grid container spacing={4}>
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper className={classes.gridItem} elevation={3}>
                                <Box className={classes.iconBox} onClick={() => routePage(item.name)}>
                                    {item.icon}
                                    <Typography className={classes.text}>{item.name}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>



            <footer>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper' }}>
                    {/* Footer content */}
                </Box>
            </footer>
        </>
    );
};

export default Home;
