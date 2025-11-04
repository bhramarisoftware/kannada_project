import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./Memberdetails.css";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Menu,
  Checkbox,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";


function MemberDetails() {
  const navigate = useNavigate();
  const [Members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [selectedmemberNumber, setSelectedmemberNumber] = useState(null);
  const [openDateDialog, setOpenDateDialog] = useState(false);
  const [openDateRangePicker, setOpenDateRangePicker] = useState(false);

  const [dateRange, setDateRange] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [anchorElDonation, setAnchorElDonation] = useState(null);
  const [selectedDonations, setSelectedDonations] = useState([]);

  const [anchorElBook, setAnchorElBook] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const openDonation = Boolean(anchorElDonation);
  const openBook = Boolean(anchorElBook);

  const handleDonationClick = (event) => {
    event.stopPropagation();
    setAnchorElDonation(event.currentTarget);
  };
  const handleBookClick = (event) => {
    event.stopPropagation();
    setAnchorElBook(event.currentTarget);
  };

  const handleDonationClose = (e) => {
    e?.stopPropagation();
    setAnchorElDonation(null);
  };
  const handleBookClose = (e) => {
    e?.stopPropagation();
    setAnchorElBook(null);
  };


  const columns = [
    { field: "id", headerName: "ಸದಸ್ಯ ಸಂಖ್ಯೆ", width: 130 },
    { field: "name", headerName: "ಶ್ರೀಮತಿ / ಶ್ರೀ", width: 150 },
    { field: "nickname", headerName: "Nick name", width: 150 },
    { field: "membershipType", headerName: "ಸದಸ್ಯರ ನಮೂನೆ", width: 150 },
    {
      field: "status",
      headerName: "ಸದಸ್ಯರ ಸ್ಥಿತಿ",
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        let bgColor = "#34C85A";
        let textColor = "#ffffff";
        if (status === "ನಿಷ್ಕ್ರಿಯ" || status === "ಮೃತ") {
          bgColor = "#34C85A";
          textColor = "#ffffff";
        }
        return (
          <Box
            component="span"
            sx={{
              backgroundColor: bgColor,
              color: textColor,
              px: 1,
              py: 0.6,
              borderRadius: "2px",
              width: "fit-content",
              fontSize: "12px",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {status}
          </Box>
        );
      },
    },
    { field: "date", headerName: "ನೊಂದಣಿ  ದಿನಾಂಕ", width: 150 },
    { field: "mobile", headerName: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", width: 150 },
    { field: "amount", headerName: "ಮೊಬಲಾಗು ", width: 150 },
    { field: "payment", headerName: "ನಗದು ವಿವರ", width: 200 },
    {
      field: "actions",
      headerName: "ಕ್ರಿಯೆಗಳು",
      width: 150,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedmemberNumber(params.row.id);
            setOpenDialog(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/members")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch members");
        return res.json();
      })
      .then((data) => {
        const members = Array.isArray(data) ? data : data.members;

        const transformed = members.map((row, i) => {
          let entries = [];
          if (typeof row.entries === "string" && row.entries.trim() !== "") {
            try {
              entries = JSON.parse(row.entries);
            } catch {
              entries = [];
            }
          } else if (Array.isArray(row.entries)) {
            entries = row.entries;
          }
          return {
            id: `${row.memberNumber}`,
            membershipType: row.membershipType || "",
            status: row.status || "",
            formData: {
              name: row.name || "",
              nickname: row.nickname || "",
              mobile: row.mobile || "",
              altMobile: row.altMobile || "",
              email: row.email || "",
              dob: row.dob || "",
              pan: row.pan || "",
              aadhaar: row.aadhaar || "",
              address: row.address || "",
              date: row.date || "",
              endDate: row.endDate || "",
            },
            entries,
            index: i,
          };
        });

        setMembers(transformed);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
      });
  }, []);

  const confirmDelete = async () => {
    if (!selectedmemberNumber) {
      console.error("No member selected for delete");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/members/${selectedmemberNumber}`);
      alert("ಸದಸ್ಯರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ!");
      setOpenDialog(false);
      window.location.reload();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };




  const filteredMembers = Members.filter((m) => {
    const matchSearch =
      m.formData?.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.formData?.nickname?.toLowerCase().includes(search.toLowerCase()) ||
      m.formData?.mobile?.includes(search);

    const matchStatus = statusFilter === "all" ? true : m.status === statusFilter;
    const matchType = typeFilter === "all" ? true : m.membershipType === typeFilter;

    let matchDate = true;
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      const memberDate = new Date(m.formData?.date);
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      matchDate = memberDate >= start && memberDate <= end;
    }
    return matchSearch && matchStatus && matchType && matchDate;
  });
  console.log(filteredMembers, "sdfxwa");

  const rows = filteredMembers
    .filter((member) => member && member.formData && member.id)
    .map((member) => ({
      id: member.id,
      index: member.index ?? 0,
      name: member.formData.name || "",
      nickname: member.formData.nickname || "",
      membershipType: member.membershipType || "",
      status: member.status || "",
      date: member.formData.date || "",
      mobile: member.formData.mobile || "",
      amount: Array.isArray(member.entries) && member.entries.length > 0
        ? member.entries.map((entry) => `₹${entry.payment}`).join(", ")
        : "—",
      payment: Array.isArray(member.entries) && member.entries.length > 0
        ? member.entries.map((entry) => entry.paymentType).join(", ")
        : "—",
      address: member.formData.address || "",
    }));

  return (
    <>
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

      <div className="members-details-wrapper">

        {/* Back Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Button
            variant="text"
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none", color: "#000", fontSize: "18px", mb: 2 }}
          >
            &lt; &nbsp;&nbsp; Back
          </Button>

          <div className="members-back-btn" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
              <Button
                style={{ backgroundColor: "#072E77", color: "#FFFFFF" }}
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/Members");
                }}
              >
                ಹೊಸ ಸದಸ್ಯರ ಸೇರ್ಪಡೆ +
              </Button>
              <div>
                <Button
                  style={{ backgroundColor: "#ffff", color: "#000000" }}
                  variant="contained"
                  onClick={() => navigate("/add-donation")}
                >
                  ಹೊಸ ಸಹಾಯ ಧನ +
                </Button>
              </div>
              <div>
                <Button
                  style={{ backgroundColor: "#ffff", color: "#000000" }}
                  variant="contained"
                  onClick={() => navigate("/BookSales")}
                >
                  ಪುಸ್ತಕ ಮಾರಾಟ +
                </Button>

              </div>

            </div>
          </div>
        </Box>


         <Box
                    sx={{
                      border: "2px solid #eae7e7ff",
                      borderRadius: 2,
                      p: 2,
                      mb: 2,
        
                      backgroundColor: "#ffffff",
                    }}
                  >


        <div style={{ display: "flex", alignItems: "center", gap: "32px", width: "100%", marginBottom: 24, paddingTop: 10, paddingBottom: 10 }}>
          <div>
            <strong>ಸದಸ್ಯರ ಪಟ್ಟಿ</strong>
            <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
              ಒಟ್ಟು ಸದಸ್ಯರ ಸಂಖ್ಯೆ - {filteredMembers.length}
            </Typography>
          </div>

          <div className="members-controls" style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "nowrap", marginLeft: "auto" }}>
            <TextField label="ಹುಡುಕಿ" variant="outlined" size="small" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ minWidth: 180 }} />
            <TextField select size="small" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ minWidth: 180 }}>
              <MenuItem value="all">ಸದಸ್ಯರ ಸ್ಥಿತಿ</MenuItem>
              <MenuItem value="ಸಕ್ರಿಯ">ಸಕ್ರಿಯ</MenuItem>
              <MenuItem value="ನಿಷ್ಕ್ರಿಯ">ನಿಷ್ಕ್ರಿಯ</MenuItem>
              <MenuItem value="ಮೃತ">ಮೃತ</MenuItem>
            </TextField>
            <TextField select size="small" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} sx={{ minWidth: 180 }}>
              <MenuItem value="all">ಸದಸ್ಯರ ನಮೂನೆ</MenuItem>
              <MenuItem value="ವಾರ್ಷಿಕ">ವಾರ್ಷಿಕ</MenuItem>
              <MenuItem value="ಆಜೀವ">ಆಜೀವ</MenuItem>
            </TextField>
            <Button
              variant="outlined"
              onClick={() => setOpenDateDialog(true)}
            >
              {dateRange && dateRange.startDate && dateRange.endDate
                ? `${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
                : 'Date Range'}
            </Button>
            <Button variant="outlined"> excle Download</Button>
          </div>
        </div>
        

        <Box sx={{ height: 500, width: "100%", mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            onRowClick={(params) => navigate(`/MemberFullDetails/${params.row.id}`)}

          />
        </Box>
        </Box>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>ಇದನ್ನು ಅಳಿಸುವುದು ಖಚಿತವೇ?</DialogTitle>
        <DialogContent>
          <Typography>ಒಮ್ಮೆ ಅಳಿಸಿದ ನಂತರ ಅದನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಲಾಗುತ್ತದೆ</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            ಬೇಡ
          </Button>
          <Button onClick={confirmDelete} color="error">
            ಅಳಿಸು
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDateDialog} onClose={() => setOpenDateDialog(false)}>
        <DialogTitle>ತಾರೀಖಿನ ವ್ಯಾಪ್ತಿ ಆಯ್ಕೆಮಾಡಿ</DialogTitle>
        <DialogContent>
          <DateRangePicker
            ranges={dateRange ? [dateRange] : [{ startDate: new Date(), endDate: new Date(), key: 'selection' }]}
            onChange={(item) => setDateRange(item.selection)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDateRange(null); setOpenDateDialog(false); }} color="primary">
            Clear
          </Button>
          <Button
            onClick={() => setOpenDateDialog(false)}
            variant="contained"
            style={{ backgroundColor: "#072E77", color: "#fff" }}
          >
            ಅನ್ವಯಿಸು
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MemberDetails;
