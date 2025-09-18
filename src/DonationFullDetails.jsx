import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";

function DonationFullDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donationsList")) || [];
    const selected = stored.map((d, index) => ({ id: index + 1, ...d }))
      .find((row) => row.id === parseInt(id));
    setDonation(selected);
  }, [id]);

  if (!donation) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          ಸದಸ್ಯರ ಮಾಹಿತಿ ಸಿಗಲಿಲ್ಲ!
        </Typography>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        ಸಹಾಯ ಧನ ವಿವರಗಳು
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography><b>ದಾನಿದಾರರ ಹೆಸರು:</b> {donation.donorName}</Typography>
        <Typography><b>Nick name:</b> {donation.nickName}</Typography>
        <Typography><b>ರಸೀದಿ ಸಂಖ್ಯೆ:</b> {donation.receipt}</Typography>
        <Typography><b>ದಾನ ಪ್ರಕಾರ:</b> {donation.donationType}</Typography>
        <Typography><b>ಮೊತ್ತ:</b> {donation.amount}</Typography>
        <Typography><b>ಜಮಾ ವಿವರ:</b> {donation.deposit}</Typography>
        <Typography><b>ಮೊಬೈಲ್ ಸಂಖ್ಯೆ:</b> {donation.mobile}</Typography>
        <Typography><b>ದಿನಾಂಕ:</b> {donation.date}</Typography>
        <Typography><b>ಟಿಪ್ಪಣಿ:</b> {donation.note}</Typography>
      </Paper>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => navigate(-1)}>
          ಹಿಂದಿರುಗಿ
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.setItem("editdonationsIndex", id);
            navigate("/add-donation");
          }}
        >
          ತಿದ್ದು (Edit)
        </Button>
      </Stack>
    </Box>
  );
}

export default DonationFullDetails;
