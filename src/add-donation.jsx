import React, { useEffect, useState } from "react";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { useNavigate } from "react-router-dom";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, MenuItem, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./Members.css";
import SearchIcon from "@mui/icons-material/Search";
import { red } from "@mui/material/colors";

function AddDonation() {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([{ fund: "", fundDetails: "", paymentType: "", receiptNumber: "", depositDetails: "" }]);
  const [editIndex, setEditIndex] = useState(null);

  const [openBackDialog, setOpenBackDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const [formData, setFormData] = useState({
    mobile: "",
    donorName: "", // <-- changed from name
    nickname: "",
    altMobile: "",
    email: "",
    dob: "",
    pan: "",
    aadhaar: "",
    address: "",
    date: "",
    endDate: ""
  });

  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("123456");

  const handleEditClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    console.log("Updated number:", number);
    setOpen(false);
  };

  // ✅ errors state
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const index = localStorage.getItem("editMemberIndex");
    if (index !== null) {
      const membersList = JSON.parse(localStorage.getItem("membersList")) || [];
      const member = membersList[index];

      if (member) {
        setFormData(member.formData);
        setEntries(member.entries?.length ? member.entries : [{ payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }]);
        setEditIndex(Number(index));
      }
      localStorage.removeItem("editMemberIndex");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validation
  // const validateForm = () => {
  //   let newErrors = {};

  //   if (!formData.searchMemberNumber) newErrors.searchMemberNumber = "ಸದಸ್ಯರ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ";
  //   if (!formData.date) newErrors.date = "ದಿನಾಂಕ ಕಡ್ಡಾಯವಾಗಿದೆ";
  //   // Mobile validation
  //   if (!formData.mobile) {
  //     newErrors.mobile = "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಕಡ್ಡಾಯವಾಗಿದೆ";
  //   } else if (!/^\d{10}$/.test(formData.mobile)) {
  //     newErrors.mobile = "ಮಾನ್ಯ 10 ಅಂಕೆಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ";
  //   }
  //   if (!formData.donorName) newErrors.donorName = "ಹೆಸರು ಕಡ್ಡಾಯವಾಗಿದೆ"; // <-- changed from name
  //   if (!formData.nickname) newErrors.nickname = "Nickname ಕಡ್ಡಾಯವಾಗಿದೆ";
  //   if (!formData.dob) newErrors.dob = "ಜನನ ದಿನಾಂಕ ಕಡ್ಡಾಯವಾಗಿದೆ";
  //   // PAN validation
  //   if (!formData.pan) {
  //     newErrors.pan = "PAN ಕಡ್ಡಾಯವಾಗಿದೆ";
  //   } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
  //     newErrors.pan = "ಮಾನ್ಯ PAN ನಮೂದಿಸಿ (ಊದಾ: ABCDE1234F)";
  //   }
  //   // Email validation
  //   if (!formData.email) {
  //     newErrors.email = "Email ಕಡ್ಡಾಯವಾಗಿದೆ";
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     newErrors.email = "ಮಾನ್ಯ Email ನಮೂದಿಸಿ";
  //   }
  //   // Aadhaar validation
  //   if (!formData.aadhaar) {
  //     newErrors.aadhaar = "ಆಧಾರ್ ಸಂಖ್ಯೆ ಕಡ್ಡಾಯವಾಗಿದೆ";
  //   } else if (!/^\d{12}$/.test(formData.aadhaar)) {
  //     newErrors.aadhaar = "ಮಾನ್ಯ 12 ಅಂಕಿಗಳ ಆಧಾರ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ";
  //   }
  //   if (!formData.address) newErrors.address = "ವಿಳಾಸ ಕಡ್ಡಾಯವಾಗಿದೆ";

  //   // entries validation
  //   entries.forEach((entry, idx) => {
  //     if (!entry.fund) newErrors[`fund_${idx}`] = "ನಿಧಿ ಆಯ್ಕೆಮಾಡಿ";
  //     if (!entry.payment) newErrors[`payment_${idx}`] = "ಮೊಬಲಾಗು ಕಡ್ಡಾಯವಾಗಿದೆ";
  //     if (!entry.receipt) newErrors[`receipt_${idx}`] = "ರಸೀದಿ ಸಂಖ್ಯೆ ಕಡ್ಡಾಯವಾಗಿದೆ";
  //     if (!entry.deposit) newErrors[`deposit_${idx}`] = "ಜಮಾ ವಿವರ ಕಡ್ಡಾಯವಾಗಿದೆ";
  //   });

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm()) return;

    // Send all fields inside formData, as backend expects
    const newDonation = {
      formData: {
        ...formData,
        searchMemberNumber: formData.searchMemberNumber || "",
      },
      entries,
    };

    try {
      const response = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newDonation)
      });

      if (!response.ok) {
        throw new Error("Failed to add donation");
      }

      navigate("/DonationTable");
    } catch (error) {
      alert("Error adding donation: " + error.message);
    }
  };



  useEffect(() => {
    // Check for donation edit
    const donationIndexStr = localStorage.getItem("editdonationIndex");
    if (donationIndexStr !== null) {
      const donationIndex = Number(donationIndexStr);
      const donationsList = JSON.parse(localStorage.getItem("donationsList")) || [];
      const donation = donationsList[donationIndex];
      if (donation) {
        setFormData(donation.formData || {
          mobile: donation.mobile || "",
          donorName: donation.donorName || "",
          nickname: donation.nickname || "",
          altMobile: donation.altMobile || "",
          email: donation.email || "",
          dob: donation.dob || "",
          pan: donation.pan || "",
          aadhaar: donation.aadhaar || "",
          address: donation.address || "",
          date: donation.date || "",
          endDate: donation.endDate || "",
          searchMemberNumber: donation.member || ""
        });
        setEntries(donation.entries?.length ? donation.entries : [{ payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }]);
        setEditIndex(donationIndex);
      }
      localStorage.removeItem("editdonationIndex");
      return;
    }
    // Fallback: check for member edit (legacy)
    const index = localStorage.getItem("editMemberIndex");
    if (index !== null) {
      const membersList = JSON.parse(localStorage.getItem("membersList")) || [];
      const member = membersList[index];
      if (member) {
        setFormData(member.formData);
        setEntries(member.entries?.length ? member.entries : [{ payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }]);
        setEditIndex(Number(index));
      }
      localStorage.removeItem("editMemberIndex");
    }
  }, []);

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

      <div className="members-wrapper" >
        <div className="members-back-btn" onClick={() => setOpenBackDialog(true)} style={{ backgroundColor: "#f7f5f5ff", padding: "1%", borderRadius: "5px", width:"100%" }} >
          <span style={{ marginLeft: 25 , fontSize: "18px"}}>&lt;&nbsp;&nbsp; Back</span>
        </div>

        <div className="members-form-card">
          <div className="members-form-header">
            <h2>ಹೊಸ ಸಹಾಯ ಧನ ವಿವರ </h2>
            <span style={{ marginLeft: "70%" }}>ಕ್ರಮಾಂಕ:{number}</span>
            <IconButton color="primary" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>ಸದಸ್ಯ ಸಂಖ್ಯೆ</DialogTitle>
              <DialogContent>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: "100%" }}>
                  <TextField
                    style={{ width: "350px" }}
                    label="ಸದಸ್ಯ ಸಂಖ್ಯೆ"
                    variant="outlined"
                    fullWidth
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    sx={{ mt: 1, mb: 2 }}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleSave}
                    endIcon={<span>→</span>} sx={{ height: 40, mt: -1 }}
                  >
                    ಉಳಿಸಿ
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </div>

          <hr style={{ width: "100%", marginBottom: "20px", color: "#222B45" }} />


          <form className="members-main-form" onSubmit={handleSubmit}>
            <div className="members-row members-row-top">
              {/* Left side: Label + Search + Button */}
              <div className="members-left" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ fontWeight: 500, fontSize: "14px" }}>ಸದಸ್ಯರ ಸಂಖ್ಯೆ</span>
                <TextField
                  placeholder="Enter number"
                  value={formData.searchMemberNumber || ""}
                  onChange={(e) => setFormData({ ...formData, searchMemberNumber: e.target.value })}
                  
                  style={{ width: "350px" }}
                  label=""
                  InputProps={{
                    endAdornment: (
                      <Button
                        
                        color="white"
                        
                        startIcon={<SearchIcon />}
                        onClick={() => console.log("Search clicked for", formData.searchMemberNumber)}
                        style={{ minWidth: 0, padding: '4px 8px' }}
                      >
                        
                      </Button>
                    )
                  }}
                />
              </div>

              {/* Right side: Date */}
              <div className="members-right" style={{ marginLeft: "auto" }}>
                <TextField
                  type="date"
                  name="date"
                  label="ದಿನಾಂಕ"
                  value={formData.date || ""}
                  onChange={handleChange}
                  
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date}
                  helperText={errors.date}
                />
              </div>
            </div>

            <hr style={{ width: "100%", marginBottom: "20px", color: "#222B45" }} />


            {/* Basic details */}
            <div className="members-row members-row-2" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center",width:"100%" }}>
              <TextField
                style={{ width: "25%" }}
                name="mobile"
                label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
                value={formData.mobile || ""}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                
                inputProps={{ maxLength: 10 }}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
              <TextField
                style={{ width: "25%", marginLeft: "5px" }}
                label="ಹೆಸರು"
                name="donorName" // <-- changed from name
                value={formData.donorName || ""} // <-- changed from name
                onChange={handleChange}
            
                error={!!errors.donorName}
                helperText={errors.donorName}
              />
              <TextField
                style={{ width: "25%", marginLeft: "5px" }}
                label="Nickname"
                name="nickname"
                value={formData.nickname || ""}
                onChange={handleChange}
                
                error={!!errors.nickname}
                helperText={errors.nickname}
              />
              <TextField
                style={{ width: "25%", marginLeft: "5px" }}
                label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ಬೇಕಾದಲ್ಲಿ)"
                name="altMobile"
                value={formData.altMobile || ""}
                onChange={handleChange}
                
                inputProps={{ maxLength: 10 }}
                error={!!errors.altMobile}
                helperText={errors.altMobile}
              />
            </div>

            <div className="members-row members-row-3" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center",width:"100%" }}>
              <TextField style={{ width: "25%" }} label="Email" name="email" type="email" value={formData.email || ""} onChange={handleChange}  />
              <TextField
                style={{ width: "25%" }}
                label="ಜನನ ದಿನಾಂಕ"
                name="dob"
                type="date"
                value={formData.dob || ""}
                onChange={handleChange}
                
                InputLabelProps={{ shrink: true }}
                error={!!errors.dob}
                helperText={errors.dob}
              />
              <TextField style={{ width: "25%", marginLeft: "5px" }} label="PAN No." name="pan" value={formData.pan || ""} onChange={handleChange} error={!!errors.pan} helperText={errors.pan} />
              <TextField style={{ width: "25%", marginLeft: "5px" }} label="Aadhaar No." name="aadhaar" value={formData.aadhaar || ""} onChange={handleChange}  error={!!errors.aadhaar} helperText={errors.aadhaar} />
            </div>

            {/* Address */}
            <div className="members-row members-row-status">
              <TextField style={{ width: "100%" }} label="ವಿಳಾಸ" name="address" value={formData.address || ""} onChange={handleChange}  error={!!errors.address} helperText={errors.address} />
            </div>

            {/* Payment section */}
            <div className="members-section-header" >
              <h3>ನಗದು ಮತ್ತು ವಿವರ</h3>
              <button type="button" className="members-add-btn" onClick={() => setEntries([...entries, { payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }])}>
                ಇನ್ನೊಂದು ಸೇರಿಸಿ <span>+</span>
              </button>
            </div>

            <hr style={{ width: "100%", marginBottom: "20px", color: "#222B45" }} />


            {entries.map((entry, index) => (
              <div style={{ marginBottom: "15px" }}>
                {/* ---------- ROW 1: Full Width with 4 Fields ---------- */}
                <div style={{ display: "flex", flexWrap: "nowrap", gap: "8px", marginBottom: "20px" }}>
                  <TextField
                    label="ಯಾವ ನಿಧಿ"
                    select
                    value={entry.fund || ""}
                    onChange={(e) => {
                      const updated = [...entries];
                      updated[index].fund = e.target.value;
                      setEntries(updated);
                    }}
                    
                    style={{  width: "25%" }}
                  >
                    <MenuItem value="ಮಿತ್ತೂರು ಕಲಾಪ್ರೋತ್ಸಾಹ ಪ್ರಶಸ್ತಿ">ಮಿತ್ತೂರು ಕಲಾಪ್ರೋತ್ಸಾಹ ಪ್ರಶಸ್ತಿ</MenuItem>
                    <MenuItem value="ಮಿತ್ತೂರು ಗ್ರಂಥ ಪ್ರಕಾಶನ ನಿಧಿ">ಮಿತ್ತೂರು ಗ್ರಂಥ ಪ್ರಕಾಶನ ನಿಧಿ</MenuItem>
                    <MenuItem value="ಮಿತ್ತೂರು ಕಟ್ಟಡ ನಿವೇಶನ ನಿಧಿ">ಮಿತ್ತೂರು ಕಟ್ಟಡ ನಿವೇಶನ ನಿಧಿ</MenuItem>
                    <MenuItem value="ಪ್ರೊ. ಎಂ. ಮರಿಯಪ್ಪ ಭಟ್ ಸಂಸ್ಕಾರ ಪ್ರಶಸ್ತಿ">ಪ್ರೊ. ಎಂ. ಮರಿಯಪ್ಪ ಭಟ್ ಸಂಸ್ಕಾರ ಪ್ರಶಸ್ತಿ</MenuItem>
                    <MenuItem value="ಮಿತ್ತೂರು ಸಂಪರ್ಕ ಗ್ರಂಥಾಲಯ ನಿಧಿ">ಮಿತ್ತೂರು ಸಂಪರ್ಕ ಗ್ರಂಥಾಲಯ ನಿಧಿ</MenuItem>
                  </TextField>

                  <TextField
                    label="ನಿಧಿಯ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ (ಬೇಕಾದಲ್ಲಿ)"
                    value={entry.fundDetails || ""}
                    onChange={(e) => {
                      const updated = [...entries];
                      updated[index].fundDetails = e.target.value;
                      setEntries(updated);
                    }}
                    
                    style={{  width: "25%" }}
                  />

                  <TextField
                    label="ಮೊಬಲಾಗು"
                    value={entry.payment || ""}
                    onChange={(e) => {
                      const updated = [...entries];
                      updated[index].payment = e.target.value;
                      setEntries(updated);
                    }}
                    
                    style={{  width: "25%" }}
                  />

                  <TextField
                    label="ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ"
                    select
                    value={entry.paymentType || ""}
                    onChange={(e) => {
                      const updated = [...entries];
                      updated[index].paymentType = e.target.value;
                      setEntries(updated);
                    }}

                    style={{  width: "25%" }}
                  >
                    <MenuItem value="Cash">ನಗದು</MenuItem>
                    <MenuItem value="Online">Online </MenuItem>
                    <MenuItem value="ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 8164">ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 8164</MenuItem>
                    <MenuItem value="ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 2345">ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 2345</MenuItem>
                    <MenuItem value="ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 5754">ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 5754</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                    <MenuItem value="DD">DD</MenuItem>
                  </TextField>
                </div>

                {/* ---------- ROW 2: Full Width Remaining ---------- */}
                <div style={{ display: "flex", flexWrap: "nowrap", gap: "8px", marginTop: "10px" }}>
                  {(entry.paymentType === "Cheque" || entry.paymentType === "DD") && (
                    <TextField
                      label={entry.paymentType === "Cheque" ? "Cheque ಸಂಖ್ಯೆ" : "DD ಸಂಖ್ಯೆ"}
                      value={entry.cheque}
                      onChange={(e) => {
                        const updated = [...entries];
                        updated[index].cheque = e.target.value;
                        setEntries(updated);
                      }}
                      
                      style={{ width: "25%" }}
                    />
                  )}

                  <TextField
                    label="ರಸೀದಿ ಸಂಖ್ಯೆ"
                    value={entry.receiptNumber || ""}
                    onChange={(e) => {
                      const updated = [...entries];
                      updated[index].receiptNumber = e.target.value;
                      setEntries(updated);
                    }}
                  
                    style={{ width: "50%" }}
                  />

                  <TextField
                    label="ಜಮಾ ವಿವರ"
                    value={entry.depositDetails || ""}
                    onChange={(e) => {
                      const updated = [...entries];
                      updated[index].depositDetails = e.target.value;
                      setEntries(updated);
                    }}

                    style={{ width: "50%" }}
                  />
                </div>



                {entries.length > 1 && (
                  <button
                    style={{ marginLeft: "92%" }}
                    type="button"
                    className="delete-entry-btn"
                    onClick={() => {
                      const updated = [...entries];
                      updated.splice(index, 1);
                      setEntries(updated);
                    }}
                  >
                    🗑 ಅಳಿಸಿ
                  </button>
                )}
              </div>
            ))}

            <div className="members-form-actions">
              <div className="error-message" style={{ marginRight: "auto", alignSelf: "center" }}>
                <p style={{ color: 'red' }}>ದಯವಿಟ್ಟು ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ</p>
              </div>
              <button type="button" className="members-cancel-btn" onClick={() => setOpenCancelDialog(true)}>
                ರದ್ದು ಮಾಡಿ
              </button>
              <button type="submit" className="members-save-btn"
                onClick={() => alert("ಹೊಸ ಸಹಾಯ ಧನ ವಿವರ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ ✅")}>
                {editIndex !== null ? "ತಿದ್ದುಪಡಿ ಉಳಿಸಿ" : " ಉಳಿಸಿ 📄 "}
              </button>


            </div>
          </form>
        </div>

        {/* Back Confirmation Dialog */}
        <Dialog open={openBackDialog} onClose={() => setOpenBackDialog(false)}>
          <DialogTitle>ನೀವು ನಿರ್ಗಮಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?</DialogTitle>
          <DialogContent>ನೀವು ನಿರ್ಗಮಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ಹೌದು ಎಂದಾದರೆ, ಅದು ಉಳಿಸಲಾಗುವುದಿಲ್ಲ.</DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenBackDialog(false);
                window.history.back();
              }}
              color="error"
            >
              ಈ ಪುಟದಿಂದ ನಿರ್ಗಮಿಸಿ
            </Button>
            <Button onClick={() => setOpenBackDialog(false)} color="primary">
              ಈ ಪುಟದಲ್ಲಿ ಇರಿ
            </Button>
          </DialogActions>
        </Dialog>

        {/* Cancel Confirmation Dialog */}
        <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
          <DialogTitle>ನೀವು ರದ್ದುಗೊಳಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?</DialogTitle>
          <DialogContent>ನೀವು ರದ್ದುಗೊಳಿಸಿದ ನಂತರ ಇದು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಿಹೋಗುತ್ತದೆ.</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCancelDialog(false)} color="error">
              ಇಲ್ಲ
            </Button>
            <Button 
              onClick={() => {
                setOpenCancelDialog(false);
                setFormData({
                  mobile: "",
                  donorName: "",
                  nickname: "",
                  altMobile: "",
                  email: "",
                  dob: "",
                  pan: "",
                  aadhaar: "",
                  address: "",
                  date: "",
                  endDate: ""
                });
                setEntries([{ payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }]);
                setEditIndex(null);
              }}
              color="primary"
            >
              ಹೌದು
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}



export default AddDonation;