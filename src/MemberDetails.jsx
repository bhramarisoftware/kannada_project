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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function MemberDetails() {
  const navigate = useNavigate();
  const [Members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Dropdown state for "ಹೊಸ ಸಹಾಯ ಧನ +"
  const [anchorElDonation, setAnchorElDonation] = useState(null);
  const [selectedDonations, setSelectedDonations] = useState([]);

  // Dropdown state for "ಪುಸ್ತಕ ಮಾರಾಟ +"
  const [anchorElBook, setAnchorElBook] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const openDonation = Boolean(anchorElDonation);
  const openBook = Boolean(anchorElBook);

  // open menu
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

  // Columns for DataGrid
  const columns = [
    { field: "id", headerName: "ಸದಸ್ಯ ಸಂಖ್ಯೆ", width: 130 },
    { field: "name", headerName: "ಶ್ರೀಮತಿ / ಶ್ರೀ", width: 150 },
    { field: "nickname", headerName: "Nick name", width: 150 },
    { field: "Status", headerName: "ಸದಸ್ಯರ ನಮೂನೆ", width: 150 },
    { field: "status", headerName: "ಸದಸ್ಯರ ಸ್ಥಿತಿ", width: 130 },
    { field: "date", headerName: "ಸೇರಿಸಿದ ದಿನಾಂಕ", width: 150 },
    { field: "mobile", headerName: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", width: 150 },
    { field: "payment", headerName: "ಪಾವತಿ ವಿವರ", width: 200 },
    { field: "address", headerName: "ನಗರ", width: 200 },
    {
      field: "actions",
      headerName: "ಕ್ರಿಯೆಗಳು",
      width: 150,
      renderCell: (params) => (
        <IconButton
          color="error"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            deleteMember(params.row.index);
          }}
        >
          <DeleteIcon  />ಅಳಿಸಿ
        </IconButton>
      ),
    },
  ];

  // Load members from localStorage
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("membersList")) || [];
    setMembers(storedMembers);
  }, []);

  // Delete a member
  const deleteMember = (index) => {
    if (window.confirm("ಸದಸ್ಯನನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?")) {
      const updated = [...Members];
      updated.splice(index, 1);
      setMembers(updated);
      localStorage.setItem("membersList", JSON.stringify(updated));
    }
  };

  // Filter + Search
  const filteredMembers = Members.filter((m) => {
    const matchSearch =
      m.formData?.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.formData?.nickname?.toLowerCase().includes(search.toLowerCase()) ||
      m.formData?.mobile?.includes(search);

    const matchStatus = statusFilter === "all" ? true : m.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Convert Members into DataGrid rows
  const rows = filteredMembers.map((member, i) => ({
    id: `LM00${i + 1}`,
    index: i,
    name: member.formData?.name || "",
    nickname: member.formData?.nickname || "",
    status: member.status || "",
    date: member.formData?.date || "",
    mobile: member.formData?.mobile || "",
    payment:
      (member.entries?.length || 0) > 0
        ? member.entries.map((entry) => `₹${entry.payment} | ${entry.paymentType}`).join(", ")
        : "—",
    address: member.formData?.address || "",
  }));

  // Common dropdown render function
  const renderDropdown = (anchorEl, open, handleClose, selected, setSelected) => (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        style: {
          borderRadius: "16px",
          border: "1px solid #072E77",
          padding: "4px",
          minWidth: "160px",
          width: 200,
          maxHeight: "260px",
        },
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {columns.map((col, index) => (
        <MenuItem
          key={col.field}
          sx={{
            borderBottom: index !== columns.length - 1 ? "1px solid #eee" : "none",
            py: 0.5,
            fontSize: "13px",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelected((prev) =>
              prev.includes(col.field)
                ? prev.filter((f) => f !== col.field)
                : [...prev, col.field]
            );
          }}
        >
          <Checkbox checked={selected.includes(col.field)} size="small" />
          <ListItemText primary={col.headerName} />
        </MenuItem>
      ))}

      <MenuItem
        onClick={(e) => {
          e.stopPropagation();
          if (selected.length === columns.length) {
            setSelected([]); // deselect all
          } else {
            setSelected(columns.map((col) => col.field)); // select all
          }
        }}
        sx={{ justifyContent: "center" }}
      >
        <Button variant="outlined" size="small">
          ಎಲ್ಲವನ್ನೂ ತೆರವುಗೊಳಿಸಿ
        </Button>
      </MenuItem>

      <MenuItem
        sx={{ justifyContent: "center" }}
        onClick={(e) => {
          e.stopPropagation();
          handleClose(e);
        }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#072E77",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "12px",
            padding: "4px 20px",
          }}
        >
          ಅನ್ವಯಿಸು
        </Button>
      </MenuItem>
    </Menu>
  );

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

      <div className="members-details-wrapper">
        <div className="members-back-btn" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Button
            variant="text"
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none", color: "#000" }}
          >
            <span style={{ marginRight: 8 }}>←</span> Back
          </Button>

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

            {/* ಹೊಸ ಸಹಾಯ ಧನ + dropdown */}
            <div>
              <Button
                style={{ backgroundColor: "#ffff", color: "#000000" }}
                variant="contained"
                onClick={handleDonationClick}
              >
                ಹೊಸ ಸಹಾಯ ಧನ +
              </Button>
              {renderDropdown(
                anchorElDonation,
                openDonation,
                handleDonationClose,
                selectedDonations,
                setSelectedDonations
              )}
            </div>

            {/* ಪುಸ್ತಕ ಮಾರಾಟ + dropdown */}
            <div>
              <Button
                style={{ backgroundColor: "#ffff", color: "#000000" }}
                variant="contained"
                onClick={handleBookClick}
              >
                ಪುಸ್ತಕ ಮಾರಾಟ +
              </Button>
              {renderDropdown(
                anchorElBook,
                openBook,
                handleBookClose,
                selectedBooks,
                setSelectedBooks
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px", width: "100%", marginBottom: 24 }}>
          <div>
            <strong>ಸದಸ್ಯರ ಪಟ್ಟಿ</strong>
            <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
              ಒಟ್ಟು ಸದಸ್ಯರ ಸಂಖ್ಯೆ - {rows.length}
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
            <TextField type="date" size="small" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <Button variant="outlined">Download</Button>
          </div>
        </div>

        {/* DataGrid Table */}
        <Box sx={{ height: 500, width: "100%", mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            onRowClick={(params) => navigate(`/MemberFullDetails/${params.row.index}`)}
          />
        </Box>
      </div>
    </>
  );
}

export default MemberDetails;