import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function DonationTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Load donations from localStorage
  const loadDonations = () => {
    const stored = JSON.parse(localStorage.getItem("donationsList")) || [];
    const formatted = stored.map((d, index) => ({
      id: index + 1,
      ...d,
    }));
    setRows(formatted);
  };

  useEffect(() => {
    loadDonations();
  }, []);

  // Delete handler
  const handleDelete = (id) => {
    const updated = rows.filter((row) => row.id !== id);
    setRows(updated);
    localStorage.setItem("donationsList", JSON.stringify(updated));
  };

  // Filtered rows
  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.donorName?.toLowerCase().includes(search.toLowerCase()) ||
      row.nickName?.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType ? row.donationType === filterType : true;

    const matchesDate =
      (!dateRange.start || new Date(row.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(row.date) <= new Date(dateRange.end));

    return matchesSearch && matchesType && matchesDate;
  });

  // Columns
  const columns = [
    { field: "donorName", headerName: "ದಾನಿದಾರರ ಹೆಸರು", width: 180 },
    { field: "nickName", headerName: "Nick name", width: 120 },
    { field: "receipt", headerName: "ರಸೀದಿ ಸಂಖ್ಯೆ", width: 150 },
    { field: "donationType", headerName: "ದಾನ ಪ್ರಕಾರ", width: 150 },
    { field: "amount", headerName: "ಮೊತ್ತ", width: 120 },
    { field: "deposit", headerName: "ಜಮಾ ವಿವರ", width: 200 },
    { field: "mobile", headerName: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", width: 160 },
    { field: "date", headerName: "ದಿನಾಂಕ", width: 150 },
    { field: "note", headerName: "ಟಿಪ್ಪಣಿ", width: 200 },
    {
      field: "actions",
      headerName: "ಕ್ರಿಯೆ",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row.id)}
        >
          ಅಳಿಸಿ
        </Button>
      ),
    },
  ];

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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
          <span>←</span> Back
        </div>
        <Button
          style={{ backgroundColor: '#072E77', color: '#FFFFFF', marginRight: '100px' }}
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-donation")}
        >
          ಹೊಸ ಸಹಾಯ ಧನ +
        </Button>
      </div>
      <Box sx={{ padding: 3 }}>
        {/* Header, Count, and Toolbar in a single line */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', marginBottom: 2 }}>

          <div>
            <strong>ಸಹಾಯ ಧನ ನೀಡಿದವರ ಪಟ್ಟಿ</strong>
            <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
              ಒಟ್ಟು ಸಹಾಯ ಧನ ನೀಡಿದವರ ಸಂಖ್ಯೆ - {rows.length}
            </Typography>
          </div>

          <TextField
          style={{ marginLeft: 'auto' }}
            label="ಹುಡುಕಿ"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 180 }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>ದಾನ ಪ್ರಕಾರ</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="ದಾನ ಪ್ರಕಾರ"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Cheque">Cheque</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="date"
            size="small"
            label="From"
            InputLabelProps={{ shrink: true }}
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
          <Button variant="outlined">Download</Button>
        </Box>

        {/* DataGrid */}
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            onRowClick={(params) => navigate(`/DonationFullDetails/${params.row.id}`)}
          />
        </div>
      </Box>
    </>
  );
}

export default DonationTable;