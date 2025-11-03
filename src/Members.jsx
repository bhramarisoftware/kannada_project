import React, { useEffect, useState } from "react";
import "react-transliterate/dist/index.css";
import { useNavigate } from "react-router-dom";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, MenuItem, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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

  const [memberId, setMemberId] = useState("");
  const [memberNumber, setMemberNumber] = useState("");


  const [memberData, setMemberData] = useState({
    membershipType: "ಆಜೀವ",
    status: "ಸಕ್ರಿಯ",
    formData: {
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
    },
    entries: [
      { payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }
    ]
  });

  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");

  const handleEditClick = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    console.log("Updated number:", number);
    setOpen(false);
  };
  // Handle formData changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setMemberData(prev => ({
      ...prev,
      formData: { ...prev.formData, [name]: value }
    }));
  };

  const updateEntry = (index, key, value) => {
    const newEntries = [...memberData.entries];
    newEntries[index][key] = value;
    setMemberData(prev => ({ ...prev, entries: newEntries }));
  };


  // Load data for edit
  // useEffect(() => {
  //   const index = localStorage.getItem("editMemberIndex");
  //   if (index !== null) {
  //     const membersList = JSON.parse(localStorage.getItem("membersList")) || [];
  //     const member = membersList[index];
  //     if (member) setMemberData(member);
  //     setEditIndex(Number(index)); 
  //     localStorage.removeItem("editMemberIndex");
  //   }
  // }, []);

  // useEffect(() => {
  //   let prefix = membershipType === "ಆಜೀವ" ? "LM" : "OM";
  //   let uniqueNumber = ""; // Replace with dynamic number later
  //   setMemberId(`${prefix}${uniqueNumber}`);
  // }, [membershipType]);

  useEffect(() => {
    if (membershipType) {
      fetch(`http://localhost:5000/api/next-member-number/${membershipType}`)
        .then(res => res.json())
        .then(data => setMemberId(data.nextNumber))
        .catch(err => console.error("Error fetching next member number:", err));
    }
  }, [membershipType]);



  // Submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   if (editIndex !== null) {
  //     await fetch("http://localhost:5000/api/members", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(memberData)
  //     });
  //   } else {
  //     await fetch("http://localhost:5000/api/members", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(memberData)
  //     });
  //   }

  //   navigate("/MemberDetails");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newMember = {
        membershipType,
        status,
        formData: memberData.formData,
        entries: memberData.entries,
      };

      const response = await fetch("http://localhost:5000/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(" Member added successfully:", data);
        alert(`ಸದಸ್ಯರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ!\nಸದಸ್ಯ ಸಂಖ್ಯೆ: ${data.memberNumber}`);

        // Reset form
        setMemberData({
          membershipType: "ಆಜೀವ",
          status: "ಸಕ್ರಿಯ",
          formData: {
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
            endDate: "",
          },
          entries: [{ payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }],
        });

        setMembershipType("ಆಜೀವ");
        setStatus("ಸಕ್ರಿಯ");

        navigate("/MemberDetails");
      } else {
        console.error(" Server error:", data);
        alert("ಸದಸ್ಯರನ್ನು ಸೇರಿಸುವಾಗ ದೋಷ ಉಂಟಾಯಿತು. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.");
      }
    } catch (err) {
      console.error(" Error submitting form:", err);
      alert("ಸರ್ವರ್ ಸಂಪರ್ಕ ಸಮಸ್ಯೆ. ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ.");
    }
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
      
        <div style={{ padding: "1%" }} className="members-wrapper">
          <div
            className="members-back-btn"
            onClick={() => setOpenBackDialog(true)}
          >
            <span style={{ marginLeft: "18px", fontSize: "18px" }}>&lt;&nbsp;&nbsp; Back</span>
          </div>
        </div>



        <div className="members-form-card">
          <div className="members-form-header">

            <h2>ಸದಸ್ಯತ್ವ ದಾಖಲೆ</h2>
            <span style={{ marginLeft: "74%" }}>ಸದಸ್ಯರ ಸಂಖ್ಯೆ: {memberId}</span>
            <IconButton color="primary" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>

            {/* Dialog box */}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>ಸದಸ್ಯ ಸಂಖ್ಯೆ</DialogTitle>
              <DialogContent>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: "100%" }}>
                  <TextField
                    style={{ width: "350px" }}
                    label="ಸದಸ್ಯ ಸಂಖ್ಯೆ"
                    variant="outlined"

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
            {/* Membership type & dates */}
            <div className="members-row members-row-type">
              <div className="members-toggle-membership">

                <p>ಸದಸ್ಯರ ನಮೂನೆ</p>
                <button
                  style={{ marginLeft: "15px" }}
                  type="button"
                  className={membershipType === "ಆಜೀವ" ? "active" : ""}
                  onClick={() => setMembershipType("ಆಜೀವ")}
                >
                  ಆಜೀವ
                </button>
                <button
                  type="button"
                  className={membershipType === "ವಾರ್ಷಿಕ" ? "active" : ""}
                  onClick={() => setMembershipType("ವಾರ್ಷಿಕ")}
                >
                  ವಾರ್ಷಿಕ
                </button>
              </div>

              {/* RIGHT SIDE DATES */}
              <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
                <TextField
                  className="members-input-date"
                  type="date"
                  name="date"
                  label="ಪ್ರಾರಂಭ ದಿನಾಂಕ"
                  value={memberData.formData.date || ""}
                  onChange={handleFormChange}

                  InputLabelProps={{ shrink: true }}
                  error={!!errors.date}
                  helperText={errors.date}
                />

                <TextField
                  className="members-input-enddate"
                  label="ಅಂತಿಮ ದಿನಾಂಕ"
                  name="endDate"
                  type="date"
                  value={memberData.formData.endDate || ""}
                  onChange={handleFormChange}

                  InputLabelProps={{ shrink: true }}
                  error={!!errors.endDate}
                  helperText={errors.endDate}
                />
              </div>
            </div>

            <hr style={{ width: "100%", marginTop: "20px", color: "#222B45" }} />

            {/* Basic details */}
            <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }} className="members-row members-row-2">
              <TextField
                style={{ width: "25%" }}
                name="mobile"
                label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ"
                value={memberData.formData.mobile || ""}
                onChange={handleFormChange}
                inputProps={{ maxLength: 10 }}
                maxLength={10}

              // inputProps={{ maxLength: 10 }}
              />
              <TextField
                style={{ width: "25%", marginLeft: "5px" }}
                label="ಹೆಸರು"
                name="name"
                value={memberData.formData.name || ""}
                onChange={handleFormChange}

              />
              <TextField
                style={{ width: "25%", marginLeft: "5px" }}
                label="Nickname"
                name="nickname"
                value={memberData.formData.nickname || ""}
                onChange={handleFormChange}

              />
              <TextField
                style={{ width: "25%", marginLeft: "5px" }}
                label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ಬೇಕಾದಲ್ಲಿ)"
                name="altMobile"
                value={memberData.formData.altMobile || ""}
                onChange={handleFormChange}

                inputProps={{ maxLength: 10 }}

              />
            </div>

            <div className="members-row members-row-3" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
              <TextField
                style={{ width: "25%" }}
                label="Email"
                name="email"
                type="email"
                value={memberData.formData.email || ""}
                onChange={handleFormChange}


              />
              <TextField
                style={{ width: "25%", marginLeft: "5px" }}
                label="ಜನನ ದಿನಾಂಕ"
                name="dob"
                type="date"
                value={memberData.formData.dob || ""}
                onChange={handleFormChange}

                InputLabelProps={{ shrink: true }}
              />
              <TextField
                style={{ width: "25%", marginLeft: "5px" }}
                label="PAN No"
                name="pan"
                value={memberData.formData.pan || ""}
                onChange={handleFormChange}


              />
              <TextField
                style={{ width: "25%", marginLeft: "5px" }}
                label="Aadhaar No"
                name="aadhaar"
                value={memberData.formData.aadhaar || ""}
                onChange={handleFormChange}


              />
            </div>

            {/* Status & address */}
            <div className="members-row members-row-status" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", gap: "10px" }}>
              <label className="members-label-status">ಸದಸ್ಯರ ಸ್ಥಿತಿ *</label>
              <div className="members-toggle-status">
                {["ಸಕ್ರಿಯ", "ನಿಷ್ಕ್ರಿಯ", "ಮೃತ"].map((s) => (
                  <button type="button" className={status === s ? "active" : ""} onClick={() => setStatus(s)}>{s}</button>
                ))}
              </div>
              <TextField
                style={{ width: "77%" }}
                label="ವಿಳಾಸ"
                name="address"
                value={memberData.formData.address || ""}
                onChange={handleFormChange}

              />
            </div>



            {/* Payment section */}
            <div className="members-section-header">
              <h3>ನಗದು ಮತ್ತು ವಿವರ</h3>
              <button
                type="button"
                className="members-add-btn"
                onClick={() =>
                  setMemberData(prev => ({
                    ...prev,
                    entries: [...prev.entries, { payment: "", paymentType: "", cheque: "", receipt: "", deposit: "" }]
                  }))
                }
              >
                ಇನ್ನೊಂದು ಸೇರಿಸಿ <span>+</span>
              </button>

            </div>

            <hr style={{ width: "100%", marginBottom: "20px", color: "#222B45" }} />

            {memberData.entries.map((entry, index) => (
              <div key={index} className="members-payment-block">
                <div
                  className="members-row members-payment-row1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "nowrap",
                    width: "100%"
                  }}
                >

                  <TextField
                    label="ಮೊಬಲಾಗು "
                    value={entry.payment}
                    onChange={(e) => updateEntry(index, "payment", e.target.value)}

                    style={{ flex: 1 }}
                    error={!!errors[`payment_${index}`]}
                    helperText={errors[`payment_${index}`]}
                  />

                  <TextField
                    label="ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ"
                    select
                    value={entry.paymentType}
                    onChange={(e) => updateEntry(index, "paymentType", e.target.value)}

                    style={{ flex: 1 }}
                    error={!!errors[`paymentType_${index}`]}
                    helperText={errors[`paymentType_${index}`]}
                  >
                    <MenuItem value="Cash">ನಗದು</MenuItem>
                    <MenuItem value="Online">Online</MenuItem>
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
                      onChange={(e) => updateEntry(index, "cheque", e.target.value)}

                      style={{ flex: 1 }}
                      error={!!errors[`cheque_${index}`]}
                      helperText={errors[`cheque_${index}`]}
                    />
                  )}

                  <TextField
                    label="ರಸೀದಿ ಸಂಖ್ಯೆ"
                    value={entry.receipt}
                    onChange={(e) => updateEntry(index, "receipt", e.target.value)}

                    style={{ flex: 1 }}
                    error={!!errors[`receipt_${index}`]}
                    helperText={errors[`receipt_${index}`]}
                  />
                </div>


                <div className="members-row members-payment-row2">
                  <TextField label="ಜಮಾ ವಿವರ" value={entry.deposit} onChange={(e) => updateEntry(index, "deposit", e.target.value)}
                    style={{ width: "100%", }} error={!!errors[`deposit_${index}`]} helperText={errors[`deposit_${index}`]} />
                </div>


                {memberData.entries.length > 1 && (
                  <button style={{ marginLeft: "92%" }} type="button" className="delete-entry-btn" onClick={() => { const updated = [...memberData.entries]; updated.splice(index, 1); setMemberData(prev => ({ ...prev, entries: updated })); }}>
                    🗑 ಅಳಿಸಿ
                  </button>
                )}

              </div>
            ))}


            <div className="members-form-actions">
              <span style={{ marginRight: "auto", color: "red" }}>ದಯವಿಟ್ಟು ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿಮಾಡಿ</span>
              <button type="button" className="members-cancel-btn" onClick={() => setOpenCancelDialog(true)}>
                ರದ್ದು ಮಾಡಿ
              </button>
              <button type="submit" className="members-save-btn" onClick={() => alert("ಸದಸ್ಯರ ಮಾಹಿತಿ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ ✅")}>{editIndex !== null ? "ತಿದ್ದುಪಡಿ ಉಳಿಸಿ" : " ಉಳಿಸಿ 📄 "}</button>
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
      
    </>
  );
}

export default Members;