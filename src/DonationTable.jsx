import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";


function DonationTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  // Date range state: null means no filter, otherwise {startDate, endDate, key}
  const [dateRange, setDateRange] = useState(null);
  const [openDateDialog, setOpenDateDialog] = useState(false);

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

    // Only filter by date if a range is selected
    let matchesDate = true;
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      const rowDate = new Date(row.date);
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      start.setHours(0,0,0,0);
      end.setHours(23,59,59,999);
      matchesDate = rowDate >= start && rowDate <= end;
    }
    return matchesSearch && matchesType && matchesDate;
  });

  // Columns
  const columns = [
    { field: "donorName", headerName: "ಶ್ರೀಮತಿ /ಶ್ರೀ", width: 180 },
    { field: "date", headerName: "ಸ್ವೀಕರಿಸಿದ ದಿನಾಂಕ", width: 120 },
    { field: "series", headerName: "ಕ್ರಮಾoಕ", width: 150 },
    { field: "member", headerName: "ಸದಸ್ಯ ಸಂಖ್ಯೆ", width: 150 },
    { field: "nickname", headerName: "Nick name", width: 120 },
    { field: "fund", headerName: "ನಿಧಿ ವಿವರ", width: 200 },
    { field: "payment", headerName: "ಮೊಬಲಾಗು", width: 160 },
    { field: "details", headerName: "ನಗದು ವಿವರ", width: 150 },
    { field: "mobile", headerName: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", width: 200 },
    {
      field: "actions",
      headerName: "ಕ್ರಿಯೆಗಳು",
      width: 120,
      renderCell: (params) => (
        <IconButton
          color="error"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(params.row.id);
          }}
        >
          <DeleteIcon /> ಅಳಿಸಿ
        </IconButton >
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <Button
          style={{ marginRight: 50 }}
          variant="text"
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none", color: "#000" }}
        >
          <span style={{ marginRight: 25, }}>←Back</span>
        </Button>
        <Button
          style={{ backgroundColor: '#072E77', color: '#FFFFFF', marginRight: '30px' }}
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
          <Button
            variant="outlined"
            color="#072E77"
            size="hug"
            onClick={() => setOpenDateDialog(true)}
            sx={{ minWidth: 160 }}
          >
            {dateRange && dateRange.startDate && dateRange.endDate
              ? `${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
              : 'Date Range'}
          </Button>
      <Dialog open={openDateDialog} onClose={() => setOpenDateDialog(false)}>
        <DialogTitle>ದಿನಾಂಕ ವ್ಯಾಪ್ತಿ ಆಯ್ಕೆಮಾಡಿ</DialogTitle>
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
          <Button variant="outlined" color="#072E77">Download</Button>
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