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
} from "@mui/material";

const MemberFullDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Load member data from localStorage
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("membersList")) || [];
    if (storedMembers[id]) {
      setData(storedMembers[id]);
    }
  }, [id]);

  if (!data) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        ಸದಸ್ಯರ ಮಾಹಿತಿ ಸಿಗಲಿಲ್ಲ
      </Typography>
    );
  }

  return (
    <>
    {/* Header */}
      <div className="heder">
        <p>ಬ್ರಹ್ಮಶ್ರೀ ಮಿತ್ತೂರು ಪುರೋಹಿತ ತಿಮ್ಮಯ್ಯ ಭಟ್ಟ ಸಂಪ್ರತಿಷ್ಠಾನ (ರಿ.)</p>
        <div className="image1">
          <img src="./bell.png" alt="bell" />
        </div>
        <div className="image2">
          <img src="./message.png" alt="message" />
        </div>
        <div className="image3">
          <img src="./Ellipse 40.png" alt="profile" />
        </div>
      </div>

    <Box sx={{ p: 3, maxWidth: "1400px", marginLeft: "10px" }}>
      {/* Back button */}
      <Button variant="text" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        &lt; Back
      </Button>

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
        {/* Title */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          ಸದಸ್ಯ ಧನ ಮಾಹಿತಿ
        </Typography>

        {/* Details Grid */}
        <Grid container spacing={25}>
          <Grid item xs={12} sm={6} md={3}>
            <LabelValue label="ಸದಸ್ಯ ಸಂಖ್ಯೆ" value={data.formData?.memberNo || "—"} />
            <LabelValue label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" value={data.formData?.mobile || "—"} />
            <LabelValue label="Email" value={data.formData?.email || "—"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <LabelValue label="ಸದಸ್ಯ ಸೇರ್ಪಡೆ ದಿನಾಂಕ" value={data.formData?.date || "—"} />
            <LabelValue label="Nick name" value={data.formData?.nickname || "—"} />
            <LabelValue label="ಶ್ರೀಮತಿ / ಶ್ರೀ " value={data.formData?.name || "—"} />

            <LabelValue label="ಜನನ ದಿನಾಂಕ" value={data.formData?.dob || "—"} />
          </Grid>
          

          <Grid item xs={12} sm={6} md={3}>
            <LabelValue label="PAN No" value={data.formData?.pan || "—"} />
            <LabelValue label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ಪರ್ಯಾಯ)" value={data.formData?.altMobile || "—"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <LabelValue label="Aadhaar No." value={data.formData?.aadhaar || "—"} />
            <LabelValue label="ವಿಳಾಸ" value={data.formData?.address || "—"} />
          </Grid>
        </Grid>

        {/* Right-side Buttons */}
        <Box sx={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.setItem("editMemberIndex", id);
              navigate("/Members ");
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
            <MenuItem onClick={() => alert("ಸದಸ್ಯರ ಸ್ಥಿತಿ")}>ಸದಸ್ಯರ ಸ್ಥಿತಿ</MenuItem>
            <MenuItem onClick={() => alert("ಹಣಕಾಸು ಮಾಹಿತಿ")}>ಹಣಕಾಸು ಮಾಹಿತಿ</MenuItem>
            <MenuItem onClick={() => alert("ಪಾವತಿ ವಿವರ")}>ಪಾವತಿ ವಿವರ</MenuItem>
          </Menu>
        </Box>
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

        {data.entries && data.entries.length > 0 ? (
          data.entries.map((entry, idx) => (
            <Box key={idx} sx={{ mb: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  {/* <LabelValue label="ಯಜಮಾನರ ಹೆಸರು" value={entry.owner || "—"} /> */}
                  <LabelValue label="Cheque/DD ಸಂಖ್ಯೆ" value={entry.cheque || "—"} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  {/* <LabelValue label="ಸಹಾಯ ನೀಡಿದ ವ್ಯಕ್ತಿ" value={entry.helper || "—"} /> */}
                  <LabelValue label="ರಸೀದಿ ಸಂಖ್ಯೆ" value={entry.receipt || "—"} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <LabelValue label="ಮೊತ್ತ" value={`₹ ${entry.payment}`} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <LabelValue label="ಪಾವತಿ ವಿಧಾನ" value={entry.paymentType || "—"} />
                </Grid>
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

export default MemberFullDetails;