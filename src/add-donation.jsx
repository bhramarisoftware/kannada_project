import React, { useEffect, useState } from "react";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { useNavigate } from "react-router-dom";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./Members.css";
import SearchIcon from "@mui/icons-material/Search";
import { red } from "@mui/material/colors";

function AddDonation() {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([{ payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }]);
  const [editIndex, setEditIndex] = useState(null);

  const [openBackDialog, setOpenBackDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const [formData, setFormData] = useState({
    mobile: "",
    name: "",
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
  const validateForm = () => {
    let newErrors = {};

    if (!formData.searchMemberNumber) newErrors.searchMemberNumber = "ಸದಸ್ಯರ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ";
    if (!formData.date) newErrors.date = "ದಿನಾಂಕ ಕಡ್ಡಾಯವಾಗಿದೆ";
    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಕಡ್ಡಾಯವಾಗಿದೆ";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "ಮಾನ್ಯ 10 ಅಂಕೆಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ";
    }
    if (!formData.name) newErrors.name = "ಹೆಸರು ಕಡ್ಡಾಯವಾಗಿದೆ";
    if (!formData.nickname) newErrors.nickname = "Nickname ಕಡ್ಡಾಯವಾಗಿದೆ";
    if (!formData.dob) newErrors.dob = "ಜನನ ದಿನಾಂಕ ಕಡ್ಡಾಯವಾಗಿದೆ";
    // PAN validation
    if (!formData.pan) {
      newErrors.pan = "PAN ಕಡ್ಡಾಯವಾಗಿದೆ";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = "ಮಾನ್ಯ PAN ನಮೂದಿಸಿ (ಊದಾ: ABCDE1234F)";
    }
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email ಕಡ್ಡಾಯವಾಗಿದೆ";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "ಮಾನ್ಯ Email ನಮೂದಿಸಿ";
    }
    // Aadhaar validation
    if (!formData.aadhaar) {
      newErrors.aadhaar = "ಆಧಾರ್ ಸಂಖ್ಯೆ ಕಡ್ಡಾಯವಾಗಿದೆ";
    } else if (!/^\d{12}$/.test(formData.aadhaar)) {
      newErrors.aadhaar = "ಮಾನ್ಯ 12 ಅಂಕಿಗಳ ಆಧಾರ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ";
    }
    if (!formData.address) newErrors.address = "ವಿಳಾಸ ಕಡ್ಡಾಯವಾಗಿದೆ";

    // entries validation
    entries.forEach((entry, idx) => {
      if (!entry.fund) newErrors[`fund_${idx}`] = "ನಿಧಿ ಆಯ್ಕೆಮಾಡಿ";
      if (!entry.payment) newErrors[`payment_${idx}`] = "ಮೊಬಲಾಗು ಕಡ್ಡಾಯವಾಗಿದೆ";
      if (!entry.receipt) newErrors[`receipt_${idx}`] = "ರಸೀದಿ ಸಂಖ್ಯೆ ಕಡ್ಡಾಯವಾಗಿದೆ";
      if (!entry.deposit) newErrors[`deposit_${idx}`] = "ಜಮಾ ವಿವರ ಕಡ್ಡಾಯವಾಗಿದೆ";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // stop if errors

    // Flatten formData and first entry for table display
    const firstEntry = entries[0] || {};
    const newDonation = {
      donorName: formData.name,
      date: formData.date,
      member: formData.searchMemberNumber,
      nickname: formData.nickname,
      mobile: formData.mobile,
      fund: firstEntry.fund || "",
      payment: firstEntry.payment || "",
      details: firstEntry.paymentType || "",
      deposit: firstEntry.deposit || "",
      receipt: firstEntry.receipt || "",
      entries,
      formData // keep full formData for details page if needed
    };
    let existingDonations = JSON.parse(localStorage.getItem("donationsList")) || [];

    if (editIndex !== null) {
      existingDonations[editIndex] = newDonation;
    } else {
      existingDonations.push(newDonation);
    }

    localStorage.setItem("donationsList", JSON.stringify(existingDonations));
    navigate("/DonationTable");
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
          name: donation.donorName || "",
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

    <div className="members-wrapper">
      <div className="members-back-btn" onClick={() => setOpenBackDialog(true)}>
        <span style={{ marginLeft: 25 }}>←Back</span>
      </div>

      <div className="members-form-card">
        <div className="members-form-header">
          <h2>{editIndex !== null ? "ಹೊಸ ಸಹಾಯ ಧನ ವಿವರ" : "ಹೊಸ ಸಹಾಯ ಧನ ವಿವರ "}</h2>
          {editIndex === null && <span style={{ marginLeft: "870px" }}>ಕ್ರಮಾoಕ:12345</span>}
          <IconButton color="primary" onClick={() => { }}>
            <EditIcon />
          </IconButton>
        </div>

        <form className="members-main-form" onSubmit={handleSubmit}>
          <div className="members-row members-row-top">
            {/* Left side: Label + Search + Button */}
            <div className="members-left" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ fontWeight: 500, fontSize: "14px" }}>ಸದಸ್ಯರ ಸಂಖ್ಯೆ</span>
              <TextField
                placeholder="Enter number"
                value={formData.searchMemberNumber || ""}
                onChange={(e) => setFormData({ ...formData, searchMemberNumber: e.target.value })}
                size="small"
                style={{ width: "350px" }}
                label=""
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<SearchIcon />}
                      onClick={() => console.log("Search clicked for", formData.searchMemberNumber)}
                      style={{ minWidth: 0, padding: '4px 8px' }}
                    >
                      ಹುಡುಕಿ
                    </Button>
                  )
                }}
              />
            </div>

            {/* Right side: Date */}
            <div className="members-right" style={{ marginLeft: "646px" }}>
              <TextField
                type="date"
                name="date"
                label="ದಿನಾಂಕ"
                value={formData.date || ""}
                onChange={handleChange}
                size="small"
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date}
              />
            </div>
          </div>



          {/* Basic details */}
          <div className="members-row members-row-2">
            <TextField
              style={{ width: "320px" }}
              name="mobile"
              label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
              value={formData.mobile || ""}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
              size="small"
              inputProps={{ maxLength: 10 }}
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
            <TextField
              style={{ width: "320px", marginLeft: "5px" }}
              label="ಹೆಸರು"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              size="small"
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              style={{ width: "320px", marginLeft: "5px" }}
              label="Nickname"
              name="nickname"
              value={formData.nickname || ""}
              onChange={handleChange}
              size="small"
              error={!!errors.nickname}
              helperText={errors.nickname}
            />
            <TextField
              style={{ width: "320px", marginLeft: "5px" }}
              label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ಬೇಕಾದಲ್ಲಿ)"
              name="altMobile"
              value={formData.altMobile || ""}
              onChange={handleChange}
              size="small"
              inputProps={{ maxLength: 10 }}
              error={!!errors.altMobile}
              helperText={errors.altMobile}
            />
          </div>

          <div className="members-row members-row-3">
            <TextField style={{ width: "320px" }} label="Email" name="email" type="email" value={formData.email || ""} onChange={handleChange} size="small" />
            <TextField
              style={{ width: "320px", marginLeft: "5px" }}
              label="ಜನನ ದಿನಾಂಕ"
              name="dob"
              type="date"
              value={formData.dob || ""}
              onChange={handleChange}
              size="small"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dob}
              helperText={errors.dob}
            />
            <TextField style={{ width: "320px", marginLeft: "5px" }} label="PAN No." name="pan" value={formData.pan || ""} onChange={handleChange} size="small" error={!!errors.pan} helperText={errors.pan} />
            <TextField style={{ width: "320px", marginLeft: "5px" }} label="Aadhaar No." name="aadhaar" value={formData.aadhaar || ""} onChange={handleChange} size="small" error={!!errors.aadhaar} helperText={errors.aadhaar} />
          </div>

          {/* Address */}
          <div className="members-row members-row-status">
            <TextField style={{ width: "1440px" }} label="ವಿಳಾಸ" name="address" value={formData.address || ""} onChange={handleChange} size="small" error={!!errors.address} helperText={errors.address} />
          </div>

          {/* Payment section */}
          <div className="members-section-header">
            <h3>ನಗದು ಮತ್ತು ವಿವರ</h3>
            <button type="button" className="members-add-btn" onClick={() => setEntries([...entries, { payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }])}>
              ಇನ್ನೊಂದು ಸೇರಿಸಿ <span>+</span>
            </button>
          </div>

          {entries.map((entry, index) => (
            <div key={index} className="members-payment-block">
              <div className="members-row members-payment-row1">
                <TextField
                  label="ಯಾವ ನಿಧಿ"
                  select
                  value={entry.fund || ""}
                  onChange={(e) => {
                    const updated = [...entries];
                    updated[index].fund = e.target.value;
                    setEntries(updated);
                  }}
                  size="small"
                  style={{ marginLeft: "5px", width: "325px" }}
                  error={!!errors[`fund_${index}`]}
                  helperText={errors[`fund_${index}`]}
                >
                  <MenuItem value="ಮಿತ್ತೂರು ಕಲಾಪ್ರೋತ್ಸಹ ಪ್ರಶಸ್ತಿ">ಮಿತ್ತೂರು ಕಲಾಪ್ರೋತ್ಸಹ ಪ್ರಶಸ್ತಿ</MenuItem>
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
                  size="small"
                  style={{ marginLeft: "3px", width: "325px" }}
                  error={!!errors[`fundDetails_${index}`]}
                  helperText={errors[`fundDetails_${index}`]}
                />

                <TextField
                  label="ಮೊಬಲಾಗು"
                  value={entry.payment || ""}
                  onChange={(e) => {
                    const updated = [...entries];
                    updated[index].payment = e.target.value;
                    setEntries(updated);
                  }}
                  size="small"
                  style={{ marginLeft: "4px", width: "325px" }}
                  error={!!errors[`payment_${index}`]}
                  helperText={errors[`payment_${index}`]}
                />
                <TextField
                  style={{ width: "320px", marginLeft: "3px" }}
                  label="ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ"
                  select
                  value={entry.paymentType || ""}
                  onChange={(e) => {
                    const updated = [...entries];
                    updated[index].paymentType = e.target.value;
                    setEntries(updated);
                  }}
                  size="small"
                  error={!!errors[`paymentType_${index}`]}
                  helperText={errors[`paymentType_${index}`]}
                >
                  <MenuItem value="Cash">ನಗದು</MenuItem>
                  <MenuItem value="Online">Online </MenuItem>
                  <MenuItem value="ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 8164">ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 8164</MenuItem>
                  <MenuItem value="ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 2345">ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 2345</MenuItem>
                  <MenuItem value="ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 5754">ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 5754</MenuItem>
                  <MenuItem value="Cheque">Cheque</MenuItem>
                  <MenuItem value="DD">DD</MenuItem>
                </TextField>

                {(entry.paymentType === "Cheque" || entry.paymentType === "DD") && (
                  <TextField
                    style={{ width: "430px", marginLeft: "4px" }}
                    label={entry.paymentType === "Cheque" ? "Cheque ಸಂಖ್ಯೆ" : "DD ಸಂಖ್ಯೆ"}
                    value={entry.cheque}
                    onChange={(e) => {
                      const updated = [...entries];
                      updated[index].cheque = e.target.value;
                      setEntries(updated);
                    }}
                    size="small"
                    error={!!errors[`cheque_${index}`]}
                    helperText={errors[`cheque_${index}`]}
                  />
                )}
                <TextField
                  style={{ width: "430px", marginLeft: "3px" }}
                  label="ರಸೀದಿ ಸಂಖ್ಯೆ"
                  value={entry.receipt || ""}
                  onChange={(e) => {
                    const updated = [...entries];
                    updated[index].receipt = e.target.value;
                    setEntries(updated);
                  }}
                  size="small"
                  error={!!errors[`receipt_${index}`]}
                  helperText={errors[`receipt_${index}`]}
                />
                <TextField
                  style={{ width: "440px", marginLeft: "10px" }}
                  label="ಜಮಾ ವಿವರ"
                  value={entry.deposit || ""}
                  onChange={(e) => {
                    const updated = [...entries];
                    updated[index].deposit = e.target.value;
                    setEntries(updated);
                  }}
                  size="small"
                  error={!!errors[`deposit_${index}`]}
                  helperText={errors[`deposit_${index}`]}
                />
              </div>

              {entries.length > 1 && (
                <button
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
            <div className="error-message" style={{ marginRight: 750, }}>
              <p style={{ color: 'red' }}>ದಯವಿಟ್ಟು ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ</p>
            </div>
            <button type="button" className="members-cancel-btn" onClick={() => setOpenCancelDialog(true)}>
              ರದ್ದು ಮಾಡಿ
            </button>
            <button type="submit" className="members-save-btn">
              {editIndex !== null ? "ತಿದ್ದುಪಡಿ ಉಳಿಸಿ" : "ಉಳಿಸಿ 🔒"}
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
                name: "",
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