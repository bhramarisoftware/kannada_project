import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
  TextField,
} from "@mui/material";

function DonationFullDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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

    <>
      {/* Header */}
      <div className="heder">
        <p>ಬ್ರಹ್ಮಶ್ರೀ ಮಿತ್ತೂರು ಪುರೋಹಿತ ತಿಮ್ಮಯ್ಯ ಭಟ್ಟ ಸಂಪ್ರತಿಷ್ಠಾನ (ರಿ.)</p>
        <div className="image1">
          <img src="/bell.png" alt="bell" />
        </div>
        <div className="image2">
          <img src="/message.png" alt="message" />
        </div>
        <div className="image3">
          <img src="/Ellipse 40.png" alt="profile" />
        </div>
      </div>

      <div>
        {/* Back button */}
        <Button variant="text" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          &lt; Back
        </Button>
      </div>

      <div>
        {/* Title with Edit and Menu Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, marginRight: 10 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom style={{ marginLeft: 40 }}>
            ಸಹಾಯ ಧನ ವಿವರ
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                // Store zero-based index for editing
                localStorage.setItem("editdonationIndex", Number(id) - 1);
                navigate("/add-donation");
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              ಹೆಜ್ಜೆ ಆಯ್ಕೆ ▼
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => alert("ಹೊಸ ಸಹಾಯ ಧನ")}>ಹೊಸ ಸಹಾಯ ಧನ</MenuItem>
              <MenuItem onClick={() => alert("ಪುಸ್ತಕ ಮಾರಾಟ")}>ಪುಸ್ತಕ ಮಾರಾಟ</MenuItem>
              
            </Menu>
          </Box>
        </Box>
      </div>

      <Box sx={{ p: 3, maxWidth: "1400px", marginLeft: "10px" }}>

        {/* Top Card */}
        <Box
          sx={{
            bgcolor: "white",
            p: 1.5,
            borderRadius: 1,
            boxShadow: 1,
            mb: 3,
            position: "relative",
          }}
        >


          {/* Details Grid */}
          <Grid container spacing={20}>
            <Grid item xs={12} sm={6} md={3}>
              <LabelValue label="ಸದಸ್ಯ ಸಂಖ್ಯೆ" value={donation?.member || ""}/>
              <LabelValue label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" value={donation?.mobile || donation?.formData?.mobile || ""} />
              <LabelValue label="Email" value={donation?.email || donation?.formData?.email || ""}/>


            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <LabelValue label="ಸಹಾಯ ಧನ ನೀಡಲಾದ ದಿನಾಂಕ" value={donation?.date || donation?.formData?.date || ""} />
              <LabelValue label="ಶ್ರೀಮತಿ / ಶ್ರೀ " value={donation?.donorName || donation?.formData?.name || ""} />
              <LabelValue label="ಜನನ ದಿನಾಂಕ" value={donation?.dob || donation?.formData?.dob || ""}/>



            </Grid>


            <Grid item xs={12} sm={6} md={3}>

              <LabelValue label="ಸದಸ್ಯರ ನಮೂನೆ" />
              <LabelValue label="Nick name" value={donation?.nickname || donation?.formData?.nickname || ""} />
              <LabelValue label="PAN No" value={donation?.pan || donation?.formData?.pan || ""}/>

            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <LabelValue label="ಸದಸ್ಯರ ಸ್ಥಿತಿ"  />
              <LabelValue label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ(ಬೇಕಾದಲ್ಲಿ)" value={donation?.altMobile || donation?.formData?.altMobile || ""} />
              <LabelValue label="Aadhaar No."  value={donation?.aadhaar || donation?.formData?.aadhaar || ""}/>

            </Grid>
          </Grid>
          <Grid>
            <LabelValue label="ವಿಳಾಸ"  value={donation?.address || donation?.formData?.address || ""} />
          </Grid>
        </Box>

        {/* Payment Section */}
        <Box
          sx={{
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            ನಗದು ಮತ್ತು ವಿವರ
          </Typography>

          {donation.entries && donation.entries.length > 0 ? (
            donation.entries.map((entry, idx) => (
              <Box key={idx} sx={{ mb: 3 }}>
                <Grid container spacing={20}>
                  <Grid item xs={12} sm={6} md={3}>
                    {/* <LabelValue label="ಯಜಮಾನರ ಹೆಸರು" value={entry.owner || "—"} /> */}
                    <LabelValue label="ಯಾವ ನಿಧಿ" value={entry.fund || ""} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    {/* <LabelValue label="ಸಹಾಯ ನೀಡಿದ ವ್ಯಕ್ತಿ" value={entry.helper || "—"} /> */}
                    <LabelValue label="ನಿಧಿಯ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ (ಬೇಕಾದಲ್ಲಿ)" value={entry.fundDetails || ""} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <LabelValue label="ಮೊಬಲಾಗು" value={entry.payment || ""} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <LabelValue label="ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ" value={entry.paymentType || ""} />
                  </Grid>
                  {(entry.paymentType === "Cheque" || entry.paymentType === "DD") && (
                    <Grid item xs={12} sm={6} md={3}>
                      <LabelValue label={entry.paymentType === "Cheque" ? "Cheque ಸಂಖ್ಯೆ" : "DD ಸಂಖ್ಯೆ"} value={entry.cheque || ""} />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6} md={3}>
                    <LabelValue label="ರಸೀದಿ ಸಂಖ್ಯೆ" value={entry.receipt || ""} />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <LabelValue label="ಜಮಾ ವಿವರ" value={entry.deposit || ""} />
                </Grid>
                <Divider sx={{ mt: 2, mb: 2 }} />
              </Box>
            ))
          ) : (
            <Typography>ಯಾವುದೇ ಪಾವತಿ ದಾಖಲೆ ಇಲ್ಲ</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

// Reusable component for Label and Value
const LabelValue = ({ label, value }) => (
  <Box sx={{ mb: 1 }}>
    <Typography variant="caption" color="text.secondary" fontWeight={600}>
      {label}
    </Typography>
    <Typography>{value}</Typography>
  </Box>
);


export default DonationFullDetails;







