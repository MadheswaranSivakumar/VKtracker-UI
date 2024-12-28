import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, TextField, Autocomplete, MenuItem, Select, Button, IconButton, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Send } from "@mui/icons-material"; // Import the send icon



import { getCaseLog } from '../../Action/dashboard'



const CaseRegistration = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [caseDetails, setCaseDetails] = useState({});
    const [filterClient, setFilterClient] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [totalExecutions, setTotalExecutions] = useState("");
    const [totalClients, setTotalClients] = useState("");
    const [totalRegistered, setTotalRegistered] = useState("");
    const [totalFailed, setTotalFailed] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [open, setOpen] = useState(false); // Controls the modal visibility
    const [toEmail, setToEmail] = useState(""); // To email state
    const [ccEmail, setCcEmail] = useState(""); // CC email state
    const [bccEmail, setBccEmail] = useState(""); // BCC email state
    const [isFormValid, setIsFormValid] = useState(true);

    const clients = Object.keys(caseDetails);

    useEffect(() => {
        mountFunction();
    }, [fromDate, toDate]);

    console.log("fromDate -", fromDate)
    console.log("toDate -", toDate)


    const formatDate = (date) => {
        const [year, month, day] = date.split('-'); // Split the date into year, month, day
        return `${day}-${month}-${year}`; // Return in the desired format
    };

    const mountFunction = async () => {
        try {
            setLoadingData(true);

            let getCaselog
            if (fromDate && toDate) {
                getCaselog = await getCaseLog({ 'fromDate': formatDate(fromDate), 'toDate': formatDate(toDate) });
            }
            else if (toDate) {
                getCaselog = await getCaseLog({ 'toDate': formatDate(toDate) });
            }
            else if (fromDate) {
                getCaselog = await getCaseLog({ 'fromDate': formatDate(fromDate) });
            }
            else {
                getCaselog = await getCaseLog({});
            }
            // let getCaselog = await getCaseLog({});
            console.log("getCaseLog", getCaselog);
            setCaseDetails(getCaselog?.data?.description || {});
        } catch (error) {
            console.log("Something went wrong", error);
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        // Convert caseDetails object into an array for filtering
        const detailsArray = Object.entries(caseDetails).map(([client, data]) => ({
            client,
            ...data,
        }));

        let filtered = detailsArray;

        // Filter by Client
        if (filterClient.length > 0) {
            filtered = filtered.filter((item) => filterClient.includes(item.client));
        }

        setFilteredData(filtered);

        // Update count boxes based on filtered data
        const updatedTotalExecutions = filtered.reduce((sum, item) => sum + item.totalExecutions, 0);
        const updatedTotalClients = new Set(filtered.map((item) => item.client)).size;
        const updatedTotalRegistered = filtered.reduce((sum, item) => sum + item.totalRegistered, 0);
        const updatedTotalFailed = filtered.reduce((sum, item) => sum + item.totalRegistrationFailed, 0);

        setTotalExecutions(updatedTotalExecutions);
        setTotalClients(updatedTotalClients);
        setTotalRegistered(updatedTotalRegistered);
        setTotalFailed(updatedTotalFailed);
    }, [filterClient, caseDetails]);

    // Handle open modal
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Handle close modal
    const handleClose = () => {
        setOpen(false);
    };

    // Handle Send action
    const handleSend = () => {
        if (toEmail.trim() === "") {
            setIsFormValid(false);
            return;
        }

        // Proceed with sending email logic here
        console.log("Sending email with details:", { toEmail, ccEmail, bccEmail,caseDetails});

        // After sending, close the modal
        handleClose();
    };

    return (
        <Box>
            {/* Summary Section */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    padding: "1rem",
                    borderRadius: "8px",

                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        padding: "1rem",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h6" color="textSecondary">
                        Total Count
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                        {totalExecutions}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        padding: "1rem",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h6" color="textSecondary">
                        Total Clients
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                        {totalClients}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        padding: "1rem",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h6" color="textSecondary">
                        Total Registered
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                        {totalRegistered}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center",
                        padding: "1rem",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h6" color="textSecondary">
                        Total Registration Failed
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                        {totalFailed}
                    </Typography>
                </Box>
            </Box>

            {/* Filter Section */}
            <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem",marginTop: "1rem", marginLeft: "2rem" }}>
                {/* Filter by Client */}
                <Autocomplete
                    multiple
                    options={clients}
                    value={filterClient}
                    onChange={(event, newValue) => setFilterClient(newValue || [])}
                    renderInput={(params) => <TextField {...params} label="Filter by Client(s)" />}
                    style={{ width: 950 }}
                />
                <TextField
                    label="From Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setFromDate(e.target.value)}
                    sx={{ width: 200 }}
                />

                {/* To Date */}
                <TextField
                    label="To Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setToDate(e.target.value)}
                    sx={{ width: 200 }}
                />

                {/* Send Mail Icon Button */}
                <IconButton onClick={handleClickOpen} sx={{ padding: "10px" }}>
                    <Send />
                </IconButton>

                {/* Dialog for Send Mail Form */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Send Email</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="To"
                            type="email"
                            fullWidth
                            value={toEmail}
                            onChange={(e) => setToEmail(e.target.value)}
                            error={!isFormValid && toEmail.trim() === ""}
                            helperText={!isFormValid && toEmail.trim() === "" ? "To email is required" : ""}
                            sx={{ marginBottom: "1rem",marginTop:"1rem" }}
                        />
                        <TextField
                            label="CC"
                            type="email"
                            fullWidth
                            value={ccEmail}
                            onChange={(e) => setCcEmail(e.target.value)}
                            sx={{ marginBottom: "1rem" }}
                        />
                        <TextField
                            label="BCC"
                            type="email"
                            fullWidth
                            value={bccEmail}
                            onChange={(e) => setBccEmail(e.target.value)}
                            sx={{ marginBottom: "1rem" }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSend} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>

            {/* Table Section */}
            <TableContainer component={Paper} sx={{width : "85rem", marginLeft: "4rem"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", fontSize: "1rem", backgroundColor: "#f0f0f0", color: "#333" }}>
                                Client Name
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ fontWeight: "bold", fontSize: "1rem", backgroundColor: "#f0f0f0", color: "#333" }}
                            >
                                Total Registered
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ fontWeight: "bold", fontSize: "1rem", backgroundColor: "#f0f0f0", color: "#333" }}
                            >
                                Total Registration Failed
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ fontWeight: "bold", fontSize: "1rem", backgroundColor: "#f0f0f0", color: "#333" }}
                            >
                                Total Documents Uploaded
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ fontWeight: "bold", fontSize: "1rem", backgroundColor: "#f0f0f0", color: "#333" }}
                            >
                                Total Executions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((data) => (
                            <TableRow key={data.client}>
                                <TableCell>{data.client}</TableCell>
                                <TableCell align="right">{data.totalRegistered}</TableCell>
                                <TableCell align="right">{data.totalRegistrationFailed}</TableCell>
                                <TableCell align="right">{data.totalDocumentsUploaded}</TableCell>
                                <TableCell align="right">{data.totalExecutions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CaseRegistration;
