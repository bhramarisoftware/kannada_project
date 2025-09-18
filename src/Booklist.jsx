import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Margin } from "@mui/icons-material";

function SalesTable() {
  const navigate = useNavigate();
  // Sample data
  const [rows, setRows] = useState([
    {
      id: 1,
      receiptNo: 2518,
      date: "00-Jan-0000",
      count: 1,
      amount: "₹ 500.00",
      mode: "ನಗದು",
      customer: "ಹೆಸರು",
    },
    {
      id: 2,
      receiptNo: 2519,
      date: "00-Jan-0000",
      count: 5,
      amount: "₹ 500.00",
      mode: "ಕರ್ನಾಟಕ ಬ್ಯಾಂಕ್ - 5754",
      customer: "ಹೆಸರು",
    },
    {
      id: 3,
      receiptNo: 2520,
      date: "00-Jan-0000",
      count: 6,
      amount: "₹ 500.00",
      mode: "ನಗದು",
      customer: "ಹೆಸರು",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Delete row
  const handleDelete = (id) => {
    if (window.confirm("ನೀವು ಈ ಸಾಲನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?")) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  // Edit row
  const handleEdit = (id) => {
    alert(`Edit row with ID: ${id}`);
  };

  // Add new row
  const handleAdd = () => {
    const newId = rows.length + 1;
    setRows([
      ...rows,
      {
        id: newId,
        receiptNo: 2500 + newId,
        date: "01-Sep-2025",
        count: 1,
        amount: "₹ 500.00",
        mode: "ನಗದು",
        customer: "ಹೊಸ ಗ್ರಾಹಕ",
      },
    ]);
  };

  // Download rows (JSON export example)
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(rows, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sales-data.json";
    link.click();
  };

  // Columns
  const columns = [
    { field: "receiptNo", headerName: "ರಸೀತಿ ಸಂಖ್ಯೆ", flex: 1 },
    { field: "date", headerName: "ಮಿತ್ತೂರಾದ ದಿನಾಂಕ", flex: 1 },
    { field: "count", headerName: "ಒಟ್ಟು ಪ್ರಮಾಣಗಳು", flex: 1 },
    { field: "amount", headerName: "ಮೊತ್ತ", flex: 1 },
    { field: "mode", headerName: "ಪಾವತಿ ರೀತಿ", flex: 1 },
    { field: "customer", headerName: "ಗ್ರಾಹಕರ ಹೆಸರು", flex: 1 },
    {
      field: "actions",
      headerName: "ಕ್ರಿಯೆಗಳು",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // Apply filters
  const filteredRows = rows.filter((row) => {
    const matchSearch =
      row.receiptNo.toString().includes(search) ||
      row.mode.includes(search) ||
      row.customer.includes(search);

    const matchFilter =
      filter === "all" ? true : filter === "cash" ? row.mode === "ನಗದು" : row.mode.includes("ಬ್ಯಾಂಕ್");

    const matchDate =
      (!dateFrom || new Date(row.date) >= new Date(dateFrom)) &&
      (!dateTo || new Date(row.date) <= new Date(dateTo));

    return matchSearch && matchFilter && matchDate;
  });

  return (
    <>
      <div>
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
      </div>

      {/* Controls */}
      <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Button onClick={() => navigate(-1)}>  {/* ✅ Back works now */}
            ← Back
          </Button>
        </Grid>

        <Grid item>
          <Button style={{ marginRight: '30px', backgroundColor: '#072E77' }} variant="contained" color="primary" onClick={() => navigate("/BookSales")}>
            ಹೊಸ ಪ್ರಸಕ್ತ ಮಾರಾಟ +
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ p: 3 }}>


        {/* Controls in a single flex line */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            flexWrap: 'nowrap',
            width: '100%',
            overflowX: 'auto',
          }}
        >

          {/* Header */}
          <Typography variant="h6" gutterBottom>
            <strong>ಪುಸ್ತಕ ಮಾರಾಟ ಪಟ್ಟಿ</strong>
          </Typography>
          <Typography variant="body2" gutterBottom>
            ಒಟ್ಟು ಪುಸ್ತಕ ಮಾರಾಟ ಸಂಖ್ಯೆ: {rows.length}
          </Typography>
          
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 180, flexShrink: 0 }}
          />
          <TextField
            select
            label="ಪೂರ್ಣ ವರದಿ"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ minWidth: 150, flexShrink: 0 }}
          >
            <MenuItem value="all">ಎಲ್ಲಾ</MenuItem>
            <MenuItem value="cash">ನಗದು</MenuItem>
            <MenuItem value="bank">ಬ್ಯಾಂಕ್</MenuItem>
          </TextField>
          <TextField
            type="date"
            size="small"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            sx={{ minWidth: 140, flexShrink: 0 }}
          />
          <Button
            variant="contained"
            onClick={handleDownload}
            sx={{ minWidth: 120, flexShrink: 0 }}
          >
            Download
          </Button>
        </Box>

        {/* DataGrid Table */}
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default SalesTable;
