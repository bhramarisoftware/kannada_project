import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import Typography from "@mui/material/Typography";

import "./Memberdetails.css";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function MemberDetails() {
  const navigate = useNavigate();
  const [Members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

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
          onClick={() => deleteMember(params.row.index)}
        >
          <DeleteIcon />
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

  // Edit a member
  const editMember = (index) => {
    localStorage.setItem("editMemberIndex", index);
    navigate("/Members");
  };

  // Filter + Search
  const filteredMembers = Members.filter((m) => {
    const matchSearch =
      m.formData.name.toLowerCase().includes(search.toLowerCase()) ||
      m.formData.nickname.toLowerCase().includes(search.toLowerCase()) ||
      m.formData.mobile.includes(search);

    const matchStatus =
      statusFilter === "all" ? true : m.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Convert Members into DataGrid rows
  const rows = filteredMembers.map((member, i) => ({
    id: `LM00${i + 1}`,
    index: i,
    name: member.formData.name,
    nickname: member.formData.nickname,
    status: member.status,
    date: member.formData.date,
    mobile: member.formData.mobile,
    payment:
      member.entries.length > 0
        ? member.entries
          .map((entry) => `₹${entry.payment} | ${entry.paymentType}`)
          .join(", ")
        : "—",
    address: member.formData.address,
  }));

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
        {/* Back Button + Actions */}
        <div className="members-back-btn" onClick={() => navigate(-1)}>
          <span>←</span> Back
          <Button style={{ marginLeft: '837px', backgroundColor: '#072E77', color: '#FFFFFF', }}
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/Members");
            }}
            sx={{ mr: 2 }}
          >
            ಹೊಸ ಸದಸ್ಯರ ಸೇರ್ಪಡೆ +
          </Button>
          <Button style={{ backgroundColor: '#ffff', color: '#000000', }}
            variant="contained"
            color="primary"
            onClick={() => navigate("")}
            sx={{ mr: 2 }}
          >
            ಹೊಸ ಸಹಾಯ ಧನ +
          </Button>
          <Button style={{ backgroundColor: '#ffff', color: '#000000', }}
            variant="contained"
            color="primary"
            onClick={() => navigate("")}
            sx={{ mr: 2 }}
          >
            ಪುಸ್ತಕ ಮಾರಾಟ +
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', width: '100%', marginBottom: 24 }}>
          <div>
            <strong>ಸದಸ್ಯರ ಪಟ್ಟಿ</strong>
            <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
              ಒಟ್ಟು ಸದಸ್ಯರ ಸಂಖ್ಯೆ - {rows.length}
            </Typography>
          </div>
          <div className="members-controls" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'nowrap',marginLeft:'auto' }}>
            <TextField
              label="ಹುಡುಕಿ"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 180 }}
            />
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="all">ಸದಸ್ಯರ ಸ್ಥಿತಿ</MenuItem>
              <MenuItem value="ಸಕ್ರಿಯ">ಸಕ್ರಿಯ</MenuItem>
              <MenuItem value="ನಿಷ್ಕ್ರಿಯ">ನಿಷ್ಕ್ರಿಯ</MenuItem>
              <MenuItem value="ಮೃತ">ಮೃತ</MenuItem>
            </TextField>
            <TextField
              type="date"
              size="small"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <Button variant="outlined">Download</Button>
          </div>
        </div>
        {/* DataGrid Table */}
        <Box sx={{ height: 500, width: "100%", mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
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

