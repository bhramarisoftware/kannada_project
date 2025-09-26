import React, { useEffect, useState } from "react";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import { useNavigate } from "react-router-dom";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, MenuItem } from "@mui/material";
import { Margin, WidthFullSharp } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { CgDisplayFullwidth } from "react-icons/cg";
import { red } from "@mui/material/colors";
import "./Members.css";

function Members() {
  const navigate = useNavigate();

  const [membershipType, setMembershipType] = useState("ಆಜೀವ");
  const [status, setStatus] = useState("ಸಕ್ರಿಯ");
  const [entries, setEntries] = useState([{ payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }]);
  const [editIndex, setEditIndex] = useState(null);

  const [openBackDialog, setOpenBackDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const validate = () => {
    const newErrors = {};
// Start Date
  if (!formData.date) newErrors.date = "ದಿನಾಂಕ ಅಗತ್ಯವಿದೆ";
 
  // End Date
  if (!formData.endDate) newErrors.endDate = "ಅಂತಿಮ ದಿನಾಂಕ ಅಗತ್ಯವಿದೆ";
 
    if (!formData.mobile) {
      newErrors.mobile = "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ 10 ಅಂಕಿಗಳಲ್ಲಿರಬೇಕು";
    }
 
    if (!formData.name) {
      newErrors.name = "ಹೆಸರು ಅಗತ್ಯವಿದೆ";
    }
    if (!formData.nickname) newErrors.nickname = "ಉಪಹೆಸರು ಅಗತ್ಯವಿದೆ";
 
 
    if (!formData.email) {
      newErrors.email = "Email ಅಗತ್ಯವಿದೆ";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "ಮಾನ್ಯ Email ನಮೂದಿಸಿ";
    }
   // PAN validation
if (!formData.pan) {
  newErrors.pan = "PAN ಕಡ್ಡಾಯವಾಗಿದೆ";
} else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
  newErrors.pan = "ಮಾನ್ಯ PAN ನಮೂದಿಸಿ (ಊದಾ: ABCDE1234F)";
}
 
 // Aadhaar validation
if (!formData.aadhaar) {
  newErrors.aadhaar = "ಆಧಾರ್ ಸಂಖ್ಯೆ ಕಡ್ಡಾಯವಾಗಿದೆ";
} else if (!/^\d{12}$/.test(formData.aadhaar)) {
  newErrors.aadhaar = "ಮಾನ್ಯ 12 ಅಂಕಿಗಳ ಆಧಾರ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ";
}
 
if (!formData.dob) newErrors.dob = "ಜನನ ದಿನಾಂಕ ಅಗತ್ಯವಿದೆ";
    if (!formData.address) {
      newErrors.address = "ವಿಳಾಸ ಅಗತ್ಯವಿದೆ";
    }
   
 
 
    entries.forEach((entry, index) => {
    if (!entry.payment) {
      newErrors[`payment_${index}`] = "ಮೊಬಲಾಗು ಅಗತ್ಯವಿದೆ";
    }
    if (!entry.paymentType) {
      newErrors[`paymentType_${index}`] = "ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ ಅಗತ್ಯವಿದೆ";
    }
    if ((entry.paymentType === "Cheque" || entry.paymentType === "DD") && !entry.cheque) {
      newErrors[`cheque_${index}`] = `${entry.paymentType} ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ`;
    }
    if (!entry.receipt) {
      newErrors[`receipt_${index}`] = "ರಸೀದಿ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ";
    }
    if (!entry.deposit) {
      newErrors[`deposit_${index}`] = "ಜಮಾ ವಿವರ ಅಗತ್ಯವಿದೆ";
    }
  });
 
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const index = localStorage.getItem("editMemberIndex");
    if (index !== null) {
      const membersList = JSON.parse(localStorage.getItem("membersList")) || [];
      const member = membersList[index];

      if (member) {
        setFormData(member.formData);
        setMembershipType(member.membershipType);
        setStatus(member.status);
        setEntries(member.entries?.length ? member.entries : [{ payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }]);
        setEditIndex(Number(index));
      }

      localStorage.removeItem("editMemberIndex");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newMember = { membershipType, status, formData, entries };
    let existingMembers = JSON.parse(localStorage.getItem("membersList")) || [];

    if (editIndex !== null) {
      existingMembers[editIndex] = newMember;
    } else {
      existingMembers.push(newMember);
    }

    localStorage.setItem("membersList", JSON.stringify(existingMembers));
    navigate("/MemberDetails");
  };

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
        <div
          className="members-back-btn"
          onClick={() => setOpenBackDialog(true)}
        >
          <span style={{marginLeft:25}}>←Back</span> 
        </div>

        <div className="members-form-card">
          <div className="members-form-header">
            <h2>{editIndex !== null ? "ಸದಸ್ಯ ತಿದ್ದುಪಡಿ" : "ಸದಸ್ಯತ್ವ ದಾಖಲೆ"}</h2>
            {editIndex === null && (
              <span style={{ marginLeft: "970px" }}>ಸದಸ್ಯರ ಸಂಖ್ಯೆ: 12345 </span>
            )}
            <IconButton color="primary" onClick={() => handleEditClick()}>
              <EditIcon />
            </IconButton>
          </div>

          <form className="members-main-form" onSubmit={handleSubmit}>
            {/* Membership type & dates */}
            <div className="members-row members-row-type">
              <div className="members-toggle-membership">
                <p>ಸದಸ್ಯರ ನಮೂನೆ</p>
                <button style={{ marginLeft: "15px" }} type="button" className={membershipType === "ಆಜೀವ" ? "active" : ""} onClick={() => setMembershipType("ಆಜೀವ")}>ಆಜೀವ</button>
                <button type="button" className={membershipType === "ವಾರ್ಷಿಕ" ? "active" : ""} onClick={() => setMembershipType("ವಾರ್ಷಿಕ")}>ವಾರ್ಷಿಕ</button>
              </div>

              <TextField  style={{ marginLeft: "560px" }} type="date" name="date" label="ದಿನಾಂಕ" value={formData.date || ""} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} error={!!errors.date} helperText={errors.date} />
              <TextField  label="ಅಂತಿಮ ದಿನಾಂಕ" name="endDate" type="date" value={formData.endDate || ""} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} error={!!errors.endDate} helperText={errors.endDate} />
            </div>

            {/* Basic details */}
            <div className="members-row members-row-2">
              <TextField  style={{ width: "320px" }} name="mobile" label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" value={formData.mobile || ""} onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })} size="small" inputProps={{maxLength:10}} error={!!errors.mobile} helperText={errors.mobile} />
              <TextField style={{ width: "320px", marginLeft: "5px" }} label="ಹೆಸರು" name="name" value={formData.name || ""} onChange={handleChange} size="small" error={!!errors.name} helperText={errors.name} />
              <TextField  style={{ width: "320px", marginLeft: "5px" }} label="Nickname" name="nickname" value={formData.nickname || ""} onChange={handleChange} size="small" error={!!errors.nickname} helperText={errors.nickname} />
              <TextField   style={{ width: "320px", marginLeft: "5px" }} label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ಬೇಕಾದಲ್ಲಿ)" name="altMobile" value={formData.altMobile || ""} onChange={handleChange} size="small" inputProps={{ maxLength: 10 }} error={!!errors.altMobile} helperText={errors.altMobile} />
            </div>

            <div className="members-row members-row-3">
              <TextField   style={{ width: "320px" }} label="Email" name="email" type="email" value={formData.email || ""} onChange={handleChange} size="small"  error={!!errors.email} helperText={errors.email} />
              <TextField   style={{ width: "320px", marginLeft: "5px" }} label="ಜನನ ದಿನಾಂಕ" name="dob" type="date" value={formData.dob || ""} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }}  error={!!errors.dob} helperText={errors.dob} />
              <TextField   style={{ width: "320px", marginLeft: "5px" }} label="PAN No" name="pan" value={formData.pan || ""} onChange={handleChange} size="small"  error={!!errors.pan} helperText={errors.pan} />
              <TextField   style={{ width: "320px", marginLeft: "5px" }} label="Aadhaar No" name="aadhaar" value={formData.aadhaar || ""} onChange={handleChange} size="small"  error={!!errors.aadhaar} helperText={errors.aadhaar} />
            </div>

            {/* Status & address */}
            <div className="members-row members-row-status">
              <label className="members-label-status">ಸದಸ್ಯರ ಸ್ಥಿತಿ *</label>
              <div className="members-toggle-status">
                {["ಸಕ್ರಿಯ", "ನಿಷ್ಕ್ರಿಯ", "ಮೃತ"].map((s) => (
                  <button key={s} type="button" className={status === s ? "active" : ""} onClick={() => setStatus(s)}>{s}</button>
                ))}
              </div>
              <TextField style={{ width: "985px" }} label="ವಿಳಾಸ" name="address" value={formData.address || ""} onChange={handleChange} size="small" error={!!errors.address} helperText={errors.address} />
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
                  <TextField label="ಮೊಬಲಾಗು " value={entry.payment} onChange={(e) => { const updated = [...entries]; updated[index].payment = e.target.value; setEntries(updated); }} size="small"
                    style={{ marginLeft: "5px", width: "350px" }} error={!!errors[`payment_${index}`]} helperText={errors[`payment_${index}`]} />
                  <TextField style={{ width: "350px", marginLeft: "5px" }} label="ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ"
                    select
                    value={entry.paymentType}
                    onChange={(e) => { const updated = [...entries]; updated[index].paymentType = e.target.value; setEntries(updated); }}
                    size="small" error={!!errors[`paymentType_${index}`]} helperText={errors[`paymentType_${index}`]} >
                    <MenuItem value="Cash">ನಗದು</MenuItem>
                    <MenuItem value="Online">Online </MenuItem>
                    <MenuItem value="ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ -  8164">ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ -  8164</MenuItem>
                    <MenuItem value="ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ -  2345">ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ -  2345</MenuItem>
                    <MenuItem value="ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ -  5754">ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ -  5754</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                    <MenuItem value="DD">DD</MenuItem>
                  </TextField>

                  {(entry.paymentType === "Cheque" || entry.paymentType === "DD") && (
                    <TextField
                      label={entry.paymentType === "Cheque" ? "Cheque ಸಂಖ್ಯೆ" : "DD ಸಂಖ್ಯೆ"}
                      value={entry.cheque}
                      onChange={(e) => {
                        const updated = [...entries];
                        updated[index].cheque = e.target.value;
                        setEntries(updated);
                      }}
                      size="small" error={!!errors[`cheque_${index}`]} helperText={errors[`cheque_${index}`]}  />
                  )}
                  <TextField style={{ width: "350px", marginLeft: "5px" }} label="ರಸೀದಿ ಸಂಖ್ಯೆ" value={entry.receipt} onChange={(e) => { const updated = [...entries]; updated[index].receipt = e.target.value; setEntries(updated); }} size="small" error={!!errors[`receipt_${index}`]} helperText={errors[`receipt_${index}`]} />
                </div>

                <div className="members-row members-payment-row2">
                  <TextField label="ಜಮಾ ವಿವರ" value={entry.deposit} onChange={(e) => { const updated = [...entries]; updated[index].deposit = e.target.value; setEntries(updated); }} size="small" style={{ width: "13200px", }} error={!!errors[`deposit_${index}`]} helperText={errors[`deposit_${index}`]} />
                </div>
                <div className="members-mandatory-note">
                  <p> ದಯವಿಟ್ಟು ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿಮಾಡಿ</p>
                </div>

                {entries.length > 1 && (
                  <button type="button" className="delete-entry-btn" onClick={() => { const updated = [...entries]; updated.splice(index, 1); setEntries(updated); }}>
                    🗑 ಅಳಿಸಿ
                  </button>
                )}
              </div>
            ))}

            <div className="members-form-actions">
              <button type="button" className="members-cancel-btn" onClick={() => setOpenCancelDialog(true)}>
                ರದ್ದು ಮಾಡಿ
              </button>
              <button type="submit" className="members-save-btn">{editIndex !== null ? "ತಿದ್ದುಪಡಿ ಉಳಿಸಿ" : "ಉಳಿಸಿ 🔒"}</button>
            </div>
          </form>
        </div>

        {/* Back Confirmation Dialog */}
        <Dialog open={openBackDialog} onClose={() => setOpenBackDialog(false)}>
          <DialogTitle>ನೀವು ನಿರ್ಗಮಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?</DialogTitle>
          <DialogContent>
            ನೀವು ನಿರ್ಗಮಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ಹೌದು ಎಂದಾದರೆ, ಅದು ಉಳಿಸಲಾಗುವುದಿಲ್ಲ.
          </DialogContent>
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
          <DialogContent>
            ನೀವು ರದ್ದುಗೊಳಿಸಿದ ನಂತರ ಇದು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಿಹೋಗುತ್ತದೆ.
          </DialogContent>
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

export default Members;