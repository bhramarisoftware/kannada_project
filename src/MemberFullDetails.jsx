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
import "./MemberFullDetails";

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
            ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
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
              <LabelValue label="ಸದಸ್ಯ ಸಂಖ್ಯೆ" value={data.formData?.memberNo || "—"} />
              <LabelValue label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" value={data.formData?.mobile || "—"} />
              <LabelValue label="Email" value={data.formData?.email || "—"} />

            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <LabelValue label="ಸೇರಿದ ದಿನಾಂಕ" value={data.formData?.date || "—"} />
              <LabelValue label="ಶ್ರೀಮತಿ / ಶ್ರೀ " value={data.formData?.name || "—"} />
              <LabelValue label="ಜನನ ದಿನಾಂಕ" value={data.formData?.dob || "—"} />



            </Grid>


            <Grid item xs={12} sm={6} md={3}>
              <LabelValue
                label="ಸದಸ್ಯರ ನಮೂನೆ"
                value={
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: "#FF4A00",
                      color: "#FFFFFF",
                      px: 1,
                      py: 0.5,
                      borderRadius: "4px",
                    }}
                  >
                    {data.membershipType}
                  </Box>
                }
              />
              <LabelValue label="Nick name" value={data.formData?.nickname || "—"} />
              <LabelValue label="PAN No" value={data.formData?.pan || "—"} />

            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <LabelValue
                label="ಸದಸ್ಯರ ಸ್ಥಿತಿ"
                value={
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: "#34C85A",
                      color: "#FFFFFF",
                      px: 1,
                      py: 0.5,
                      borderRadius: "4px",
                    }}
                  >
                    {data.status}
                  </Box>
                }
              />

              <LabelValue label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ  (ಬೇಕಾದಲ್ಲಿ)" value={data.formData?.altMobile || "—"} />
              <LabelValue label="Aadhaar No." value={data.formData?.aadhaar || "—"} />

            </Grid>
          </Grid>
          <Grid>
            <LabelValue label="ವಿಳಾಸ" value={data.formData?.address || "—"} />
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

          {data.entries && data.entries.length > 0 ? (
            data.entries.map((entry, idx) => (
              <Box key={idx} sx={{ mb: 3 }}>
                {/* Render the header for each entry */}
                <Typography variant="h6" fontWeight="bold" fontSize="1.10rem" gutterBottom>
                  {`${idx + 1} ನೇ ನಗದು ಮತ್ತು ವಿವರ`}   {/* Or just “ನಗದು ಮತ್ತು ವಿವರ” */}
                </Typography>
                <Grid container spacing={20}>
                  <Grid item xs={12} sm={6} md={3}>
                    {/* <LabelValue label="ಯಜಮಾನರ ಹೆಸರು" value={entry.owner || "—"} /> */}
                    <LabelValue label="ಮೊಬಲಾಗು" value={`₹ ${entry.payment}`} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    {/* <LabelValue label="ಸಹಾಯ ನೀಡಿದ ವ್ಯಕ್ತಿ" value={entry.helper || "—"} /> */}

                    <LabelValue label="ಹಣ ಪಡೆದ ರೀತಿ" value={entry.paymentType || "—"} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <LabelValue label="ರಸೀದಿ ಸಂಖ್ಯೆ" value={entry.receipt || "—"} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <LabelValue label="ಪಾವತಿಸಿದ ದಿನಾಂಕ" value={data.formData?.date || "—"} />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <LabelValue label="ಜಮಾ ವಿವರ" value={entry.deposit || "—"} />
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