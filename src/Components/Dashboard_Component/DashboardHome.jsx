import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);





const getToken = () => {
    return localStorage.getItem('authToken');
};

const styles = {
    root: {
        flexGrow: 1,
        padding: '10px',
    },
    iconBox: {
        backgroundColor: '#E0F7FA',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
    },
    count: {
        fontSize: '40px',
        fontWeight: 'bold',
        color: '#012e3f',
    },
    process: {
        marginTop: '10px',
        color: '#012e3f',
        textTransform: 'capitalize', // Capitalizes process name properly
    },
};



const DashboardHome = () => {


    const [data, setData] = useState([]);
    const token = getToken();
    const [intervalId, setIntervalId] = useState(null);

    // Function to compare two arrays
    const isEqual = (newData, prevData) => {
        return JSON.stringify(newData) === JSON.stringify(prevData);
    };

    useEffect(() => {
        // Function to fetch data
        const fetchData = () => {
            fetch('http://127.0.0.1:5000/api/automation_count', {
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
                        if (!isEqual(newData, data)) {
                            setData(newData); // Only update state if data has changed
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

        const id = setInterval(fetchData, 1000);
        setIntervalId(id);

        return () => {
            clearInterval(id);
        };
    }, [token, data]);

    // Find the specific process
    const processData = data.filter(item => item.process);
    console.log(processData)


    const generateBarData = (yearBaseData) => {
        yearBaseData.sort((a, b) => Object.keys(b)[0] - Object.keys(a)[0]);

        const labels = yearBaseData.map(yearData => Object.keys(yearData)[0]); // ['2024', '2023']
        const data = yearBaseData.map(yearData => Object.values(yearData)[0]); // [200, 100]
        return {
            labels,
            datasets: [
                {
                    label: 'Yearly Process Count',
                    data: data,
                    backgroundColor: '#51b2d5',
                    borderColor: '#00b0f0',
                    borderWidth: 1,
                },
            ],
        };
    };

    // Bar chart options
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false, // Hide x-axis grid lines if needed
                },
            },
            y: {
                grid: {
                    display: false, // Hide y-axis grid lines if needed
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };


    return (
        <Box
            sx={{
                padding: '20px',
                backgroundColor: '#f5f5f5',
                // height: '100vh',
                right: "40%"
            }}
        >
            <Grid container spacing={6}>
                {processData && processData.length > 0 ? (
                    processData.map((data, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            {/* Wrapper Box for count and chart */}
                            <Box
                                sx={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    padding: '1px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between', // Space between count and chart
                                    height: '190px', // Increased height for better spacing
                                    boxShadow: 2, // Optional: add shadow for better visual
                                    position: 'relative', // For positioning process title
                                }}
                            >
                                {/* Title for process, centered at the top */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        position: 'absolute',
                                        top: '25px', // Adjust top margin as needed
                                        left: '21%',
                                        transform: 'translateX(-50%)',
                                        width: '30%',
                                        textAlign: 'center',
                                        fontSize: '17px',
                                        fontWeight: 'bold',
                                        
                                    }}
                                >
                                    {data.process}
                                </Typography>

                                {/* Left container for the total count */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '40%', // Adjust width for spacing
                                        padding: '10px',
                                        
                                    }}
                                >
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        {data.count}
                                    </Typography>
                                </Box>

                                {/* Right container for the bar chart */}
                                <Box
                                    sx={{
                                        height: '100%',
                                        width: '60%', // Adjust width for spacing
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '10px',
                                        backgroundColor: '#f5f5f5',
                                    }}
                                >
                                    <Bar data={generateBarData(data.year_base)} options={barOptions} />
                                </Box>
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Typography>No data available</Typography>
                )}
            </Grid>
        </Box>
    );

};

export default DashboardHome;