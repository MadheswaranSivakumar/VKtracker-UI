import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = ({ open, message, severity = 'success', onClose }) => {
    console.log('Snackbar Severity:', open, message, severity, onClose);
    // console.log('Snackbar message:', message);

    // Determine background color based on severity
    const backgroundColor = severity === 'success' ? '#4caf50' : '#f44336';

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000} // Automatically close after 3 seconds
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position the snackbar at the top-right
        >
            <Alert
                onClose={onClose}
                severity={severity}
                sx={{
                    width: '100%',
                    fontWeight: 'bold',
                    backgroundColor: backgroundColor, // Apply background color based on severity
                    color: 'white',              // White text
                    padding: '12px',             // Increased padding for more prominent alert
                    borderRadius: '8px',         // Rounded corners
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)', // Enhance shadow for professional look
                }}
                icon={false} // Removes default icon, or you can replace with a custom icon
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
