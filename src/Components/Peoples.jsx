import React, { useEffect, useState } from 'react'
// import { AppBar, Toolbar, Box, CssBaseline,  Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../Images/logo.png';
import logout from '../Images/Logout.png';
import { AppBar, Avatar, Toolbar, Box, CssBaseline, Container, Grid, Card, CardContent, Typography, IconButton, Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { Email, Phone, MoreVert } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import CustomSnackbar from '../Action/CustomSnackBar';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';



const getToken = () => {
    return localStorage.getItem('authToken');
};

const fetchUsers = async () => {
    return [
        {
            id: 1,
            name: "Venkateshwaran",
            department: "Team Leader",
            hiredDate: "7/27/13",
            email: "Ronald043@gmail.com",
            phone: "(229) 555-0109",
            avatar: "",
        },
        {
            id: 2,
            name: "Maris Ulaganathan",
            department: "Software Developer",
            hiredDate: "10/28/12",
            email: "Ronald043@gmail.com",
            phone: "(406) 555-0120",
            avatar: "",
            aadhar: "2233445566778"
        },
        {
            id: 3,
            name: "Prem Kumar",
            department: "Senior Software Developer",
            hiredDate: "9/4/12",
            email: "Ronald043@gmail.com",
            phone: "(684) 555-0102",
            avatar: "",
            aadhar: "2233445566778"
        },
        {
            id: 4,
            name: "Mothilal",
            department: "Senior Software Developer",
            hiredDate: "4/4/18",
            email: "Ronald043@gmail.com",
            phone: "(564) 555-0109",
            avatar: "",
            aadhar: "2233445566778"
        },
        {
            id: 5,
            name: "Ebenezer",
            department: "Software Developer",
            hiredDate: "1/15/12",
            email: "Ronald043@gmail.com",
            phone: "(479) 555-0120",
            avatar: "",
            aadhar: "2233445566778"
        },
        {
            id: 6,
            name: "Janani Pascal",
            department: "Project Manager",
            hiredDate: "7/27/13",
            email: "Ronald043@gmail.com",
            phone: "(684) 555-0109",
            avatar: "",
            aadhar: "2233445566778"
        },
    ];
};


const Peoples = () => {

    const [isHovered, setIsHovered] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackbarData] = useState({ severity: 'success', message: '' });
    const [candidateData, setCandidateData] = useState([])
    const [intervalId, setIntervalId] = useState(null);

    const [editMode, setEditMode] = useState(false);

    const token = getToken();

    const navigate = useNavigate();

    const isEqual = (newData, prevData) => {
        return JSON.stringify(newData) === JSON.stringify(prevData);
    };

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

    // Open dialog with selected user data
    const handleClickOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    // Close dialog
    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const [formData, setFormData] = useState({
        vkId: '',
        username: '',
        role: '',
        hiredDate: '',
        email: '',
        phone: '',
        password: ''
    });

    // Define field configurations
    const fields = [
        { label: 'Vknowlabs ID', name: 'vkId', required: true, type: 'text' },
        { label: 'User Name', name: 'username', required: true, type: 'text' },
        { label: 'Email', name: 'email', required: true, type: 'text' },
        { label: 'Select Role', name: 'role', required: true, type: 'dropdown', options: ['Team Leader', 'Manager', 'Software Developer', 'Senior Software Developer', 'Tester'] },
        { label: 'Phone Number', name: 'phone', required: true },
        { label: 'Hire Date', name: 'hiredDate', required: true, type: 'date' },
        { label: 'Password', name: 'password', required: false },
    ];

    const handleChange = (name, value) => {
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                vkId: selectedUser.vkId,
                username: selectedUser.username || '',
                role: selectedUser.role || '',
                hiredDate: selectedUser.hiredDate || '',
                email: selectedUser.email || '',
                phone: selectedUser.phone || '',
            });
        }
    }, [selectedUser]);
    


    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/user',
                formData
                , {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

            setSnackbarData({ severity: 'success', message: 'Candidate added successfully!' });
            setOpenSnackbar(true);
            setFormData({
                vkId: '',
                username: '',
                hiredDate: '',
                email: '',
                password: '',
                role: '',
                phone: ''
            });
            setShowForm(false); // Hide the form after submission
        } catch (error) {
            setSnackbarData({ severity: 'error', message: 'There was an error adding the candidate!' });
            setOpenSnackbar(true);
            console.log("unsuccess")
            console.error('There was an error adding the candidate!', error);
        }
    };


    useEffect(() => {
        // Function to fetch data
        const fetchData = () => {
            fetch('http://127.0.0.1:5000/api/getuser', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token here
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(newData => {
                    console.log('Fetched Data:', newData);
                    if (Array.isArray(newData)) {
                        // Check if the new data is different from the current data
                        if (!isEqual(newData, candidateData)) {
                            setCandidateData(newData); // Only update state if data has changed
                            console.log('Data updated');
                        } else {
                            console.log('No change in data');
                        }
                    } else {
                        console.error('Data is not an array:', newData);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        };
        // console.log(candidateData)
        const id = setInterval(fetchData, 1000);
        setIntervalId(id);

        return () => {
            clearInterval(id);
        };

    }, [token, candidateData]);


    const updateHandleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        console.log("handleUpdate - ", formData);
    
        fetch('http://127.0.0.1:5000/api/usersUpdate', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token here
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Send the form data as JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            console.log('Update successful:', data);
            setEditMode(false); // Exit edit mode after successful update
        })
        .catch(error => {
            console.error('Error updating user data:', error);
        });
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

                    <Typography variant="h6" sx={{
                        flexGrow: 1,
                        background: 'linear-gradient(to right, #003f56, #0077a2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block', // Ensure it works for inline elements
                    }}>
                        USER MANAGE
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

            <Container maxWidth="xl">
                {/* Page Heading */}
                <Box display="flex" justifyContent="space-between" alignItems="center" my={3}>
                    <Typography variant="h4" component="h1">
                        {`${candidateData.length} Employees`}
                    </Typography>
                    <div>
                        <Button variant="contained" sx={{
                            backgroundImage: 'linear-gradient(to right, #5dcdf5, #00b0f0)',
                            color: '#fff', // Ensure text is readable
                        }} onClick={() => setShowForm(true)}>
                            + Add Candidate
                        </Button>
                        <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="lg" alignItems="center">
                            <DialogTitle>Add New Candidate</DialogTitle>
                            <DialogContent>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        {fields.map((field, index) => (
                                            <Grid item xs={12} sm={4} key={field.name}>
                                                {field.type === 'dropdown' ? (
                                                    <Autocomplete
                                                        value={formData[field.name] || null}
                                                        onChange={(event, newValue) => handleChange(field.name, newValue)} // Correctly passing the field name and newValue
                                                        options={field.options || []}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label={field.label}
                                                                placeholder={field.placeholder || 'Select Role'}
                                                                required={field.required}
                                                                fullWidth
                                                                margin="normal"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                sx={{
                                                                    '.MuiInputBase-root': { color: '#797979' },
                                                                    '.MuiInputBase-input': { color: '#797979' },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                ) : field.type === 'date' ? (
                                                    <TextField
                                                        key={field.name}
                                                        label="Hire Date"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        fullWidth
                                                        margin="normal"
                                                        required={field.required}
                                                        value={formData[field.name] || ''}
                                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                                    />
                                                ) : (
                                                    <TextField
                                                        key={field.name}
                                                        label={field.label}
                                                        name={field.name}
                                                        value={formData[field.name] || ''}
                                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                                        required={field.required}
                                                        fullWidth
                                                        margin="normal"
                                                    />
                                                )}
                                            </Grid>
                                        ))}
                                    </Grid>
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <div>
                                    <Button variant="contained" color="#00b0f0" onClick={handleSubmit}>
                                        Create Candidate
                                    </Button>
                                    <CustomSnackbar

                                        open={openSnackbar}
                                        message={snackbarData.message}
                                        severity={snackbarData.severity}
                                        onClose={handleCloseSnackbar}
                                    />
                                    {/* <CustomSnackbar
                                        open={true}
                                        message="Test Message"
                                        severity="error"  // Test with 'error' as well
                                        onClose={handleCloseSnackbar}
                                    /> */}

                                </div>

                                <Button variant="outlined" color="#00b0f0" onClick={() => setShowForm(false)}>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Box>

                {/* Grid Layout for User Cards */}
                <Grid container spacing={3} justifyContent="flex-start" alignItems="stretch">
                    {candidateData.map((user) => (
                        <Grid item xs={12} sm={7} md={3} key={user.vkId}>
                            <Card sx={{ boxShadow: '5px 0px 15px rgba(0, 0, 0, 0.2)' }}>
                                <Box display="flex" alignItems="center" p={2}>
                                    {/* User Avatar */}
                                    <Avatar alt={user.username} src={user.avatar} sx={{ width: 56, height: 56 }} />

                                    {/* User Info */}
                                    <Box ml={2} flexGrow={1}>
                                        <Typography variant="h6">{user.username}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {user.role}
                                        </Typography>
                                    </Box>

                                    {/* Options Icon */}
                                    <IconButton onClick={() => handleClickOpen(user)}>
                                        <MoreVert />
                                    </IconButton>
                                </Box>

                                {/* Card Content */}
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary">
                                        Hired Date: {user.hiredDate}
                                    </Typography>
                                    <Box display="flex" alignItems="center" mt={1}>
                                        <PermIdentityIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{user.vkId}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" mt={1}>
                                        <Email fontSize="small" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{user.email}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" mt={1}>
                                        <Phone fontSize="small" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{user.phone}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Dialog for displaying user details */}
                <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                    <DialogTitle>
                        <Typography variant="h5" fontWeight="bold">User Details</Typography>
                    </DialogTitle>

                    <DialogContent dividers>
                        {selectedUser && (
                            <Box p={2}>
                                {/* Avatar and Name Section */}
                                <Box display="flex" alignItems="center" mb={6} sx={{ borderBottom: '1px solid #e0e0e0', pb: 3 }}>
                                    <Avatar alt={selectedUser.username} src={selectedUser.avatar} sx={{ width: 72, height: 72, mr: 3 }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">{selectedUser.username}</Typography>
                                        <Typography variant="body2" color="textSecondary" mt={0.5}>
                                            {selectedUser.role}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Dynamically Render User Details in a Single Row */}
                                <Box>
                                    <Grid container spacing={2}>
                                        {Object.entries({
                                            "Role": 'role',
                                            "Hired Date": 'hiredDate',
                                            "Email": 'email',
                                            "Phone": 'phone'
                                        }).map(([label, field]) => (
                                            <Grid item xs={12} sm={7} md={3} key={label}>
                                                <Box
                                                    display="flex"
                                                    flexDirection="column"
                                                    alignItems="flex-start"
                                                    p={2}
                                                    border="1px solid #e0e0e0"
                                                    borderRadius="6px"
                                                    boxShadow={1}
                                                    sx={{ height: '100%', backgroundColor: '#fafafa' }}
                                                >
                                                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                                                        {label}
                                                    </Typography>
                                                    {editMode ? (
                                                        <TextField
                                                            name={field}
                                                            value={formData[field]}
                                                            onChange={updateHandleChange}
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    ) : (
                                                        <Typography variant="body1">
                                                            {formData[field]}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Box>
                        )}
                    </DialogContent>

                    <DialogActions>
                        {editMode ? (
                            <>
                                <Button onClick={handleUpdate} variant="contained" sx={{ backgroundImage: 'linear-gradient(to right, #5dcdf5, #00b0f0)',color: '#fff' }}>
                                    Update
                                </Button>
                                <Button onClick={() => setEditMode(false)} variant="outlined"  sx={{ color: 'black' }}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => setEditMode(true)} variant="contained" sx={{ backgroundImage: 'linear-gradient(to right, #5dcdf5, #00b0f0)',color: '#fff' }}>
                                    Edit
                                </Button>
                                <Button onClick={handleClose} variant="outlined" sx={{ color: 'black' }} >
                                    Close
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>

            </Container>

        </>
    );

};

export default Peoples;