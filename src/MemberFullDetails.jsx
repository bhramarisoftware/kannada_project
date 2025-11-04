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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./MemberFullDetails";

const MemberFullDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openBackDialog, setOpenBackDialog] = useState(false); // dialog state

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/members/${id}`);
        if (!res.ok) throw new Error("Failed to fetch member");
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error("Error fetching member:", err);
      }
    };
    fetchMember();
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

      <div style={{ backgroundColor: "#f5f5f5ff", minHeight: "100vh" }}>
        <div>
          {/* Back button opens dialog */}
          <Button
            variant="text"
            onClick={() => setOpenBackDialog(true)}
            sx={{ fontSize: "18px", fontWeight: 500, color: "black" }}
          >
            &lt; &nbsp; Back
          </Button>
        </div>

        <Box sx={{ p: 3, maxWidth: "1400px" }}>
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                marginRight: 10,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    localStorage.setItem("editMemberIndex", id);
                    navigate("/Members");
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  ಹೆಜ್ಜೆ ಆಯ್ಕೆ
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      alert("ಆಜೀವ ಸದಸ್ಯರ ಹೆಚ್ಚು ಹಣ — Coming soon!");
                    }}
                  >
                    ಆಜೀವ ಸದಸ್ಯರ ಹೆಚ್ಚು ಹಣ
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      navigate("/add-donation");
                    }}
                  >
                    ಹೊಸ ಸಹಾಯ ಧನ
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      navigate("/BookSales");
                    }}
                  >
                    ಪುಸ್ತಕ ಮಾರಾಟ
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            <hr
              style={{ width: "100%", marginBottom: "20px", color: "#222B45" }}
            />

            {/* Member Info Section */}
            <Grid container spacing={20}>
              <Grid item xs={12} sm={6} md={3}>
                <LabelValue label="ಸದಸ್ಯ ಸಂಖ್ಯೆ" value={data.memberNo || "—"} />
                <LabelValue label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" value={data.mobile || "—"} />
                <LabelValue label="Email" value={data.email || "—"} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <LabelValue label="ಸೇರಿದ ದಿನಾಂಕ" value={data.date || "—"} />
                <LabelValue label="ಶ್ರೀಮತಿ / ಶ್ರೀ " value={data.name || "—"} />
                <LabelValue label="ಜನನ ದಿನಾಂಕ" value={data.dob || "—"} />
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
                <LabelValue label="Nick name" value={data.nickname || "—"} />
                <LabelValue label="PAN No" value={data.pan || "—"} />
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

                <LabelValue
                  label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ  (ಬೇಕಾದಲ್ಲಿ)"
                  value={data.altMobile || "—"}
                />
                <LabelValue label="Aadhaar No." value={data.aadhaar || "—"} />
              </Grid>
            </Grid>
            <Grid>
              <LabelValue label="ವಿಳಾಸ" value={data.address || "—"} />
            </Grid>
          </Box>

          {/* Payment Details */}
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
            <hr
              style={{ width: "100%", marginBottom: "20px", color: "#000" }}
            />

            {data.entries && data.entries.length > 0 ? (
              data.entries.map((entry, idx) => (
                <Box key={idx} sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    fontSize="1.10rem"
                    gutterBottom
                  >
                    {`${idx + 1} ನೇ ನಗದು ಮತ್ತು ವಿವರ`}
                  </Typography>
                  <Grid container spacing={20}>
                    <Grid item xs={12} sm={6} md={3}>
                      <LabelValue label="ಮೊಬಲಾಗು" value={`₹ ${entry.payment}`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <LabelValue
                        label="ಹಣ ಪಡೆದ ರೀತಿ"
                        value={entry.paymentType || "—"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <LabelValue
                        label="ರಸೀದಿ ಸಂಖ್ಯೆ"
                        value={entry.receipt || "—"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <LabelValue
                        label="ಪಾವತಿಸಿದ ದಿನಾಂಕ"
                        value={entry.date || "—"}
                      />
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
      </div>

      {/* 🔹 Confirmation Dialog */}
      <Dialog
        open={openBackDialog}
        onClose={() => setOpenBackDialog(false)}
      >
        <DialogTitle>ನೀವು ನಿರ್ಗಮಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?</DialogTitle>
        <DialogContent>
          ನೀವು ನಿರ್ಗಮಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ಹೌದು ಎಂದಾದರೆ, ಅದು ಉಳಿಸಲಾಗುವುದಿಲ್ಲ.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenBackDialog(false);
              navigate(-1); // go back
            }}
            color="error"
          >
            ಈ ಪುಟದಿಂದ ನಿರ್ಗಮಿಸಿ
          </Button>
          <Button
            onClick={() => setOpenBackDialog(false)}
            color="primary"
          >
            ಈ ಪುಟದಲ್ಲಿ ಇರಿ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const LabelValue = ({ label, value }) => (
  <Box sx={{ mb: 1 }}>
    <Typography variant="caption" color="text.secondary" fontWeight={600}>
      {label}
    </Typography>
    <Typography>{value}</Typography>
  </Box>
);

export default MemberFullDetails;
