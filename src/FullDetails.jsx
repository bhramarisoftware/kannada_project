import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Margin } from "@mui/icons-material";

export default function MemberDetails() {
  const navigate = useNavigate();
  // Sample data
  const [rows, setRows] = useState([
    {
      id: 1,
      memberId: "LM002",
      name: "ಹೆಸರು",
      nickname: "Nick name",
      father: "ಅಪ್ಪ",
      status: "ಸಕ್ರಿಯ",
      startDate: "00-Jan-0000",
      mobile: "9000000000",
      amount: 500,
      address: "ನಗರ",
      bank: "",
    },
    {
      id: 2,
      memberId: "LM003",
      name: "ಹೆಸರು",
      nickname: "Nick name",
      father: "ಅಪ್ಪ",
      status: "ಸಕ್ರಿಯ",
      startDate: "00-Jan-0000",
      mobile: "9000000000",
      amount: 500,
      address: "ನಗರ",
      bank: "ಕನ್ನಡ ಬ್ಯಾಂಕ್ - 5754",
    },
  ]);

  const columns = [
    { field: "memberId", headerName: "ಸದಸ್ಯರ ಸಂಖ್ಯೆ", width: 120 },
    { field: "name", headerName: "ಶ್ರೀ / ಶ್ರೀಮತಿ", width: 150 },
    { field: "nickname", headerName: "Nick name", width: 150 },
    { field: "father", headerName: "ಸದಸ್ಯರ ಸಮಾನಿ", width: 150 },
    {
      field: "status",
      headerName: "ಸದಸ್ಯರ ಸ್ಥಿತಿ",
      width: 120,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: "green",
            color: "white",
            px: 1.5,
            py: 0.5,
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "0.85rem",
            fontWeight: "bold",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    { field: "startDate", headerName: "ಸೇರಿದ ದಿನಾಂಕ", width: 150 },
    { field: "mobile", headerName: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", width: 150 },
    {
      field: "amount",
      headerName: "ಮೊತ್ತ",
      width: 120,
      renderCell: (params) => `₹ ${params.value.toFixed(2)}`,
    },
    { field: "address", headerName: "ವಿಳಾಸ", width: 150 },
    { field: "bank", headerName: "ನಗರ / ಬ್ಯಾಂಕ್ ವಿವರ", width: 200 },
    {
      field: "actions",
      headerName: "ಕ್ರಿಯೆಗಳು",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => {
            setRows(rows.filter((row) => row.id !== params.row.id));
          }}
        >
          <DeleteIcon />
        </IconButton>
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

      <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
        <span style={{marginLeft:28}}>←Back</span> 
      </div>

      <Box sx={{ p: 3 }}>
        {/* Header */}

        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginBottom: 2 }}>
          <div>
            <strong>ಪುಸ್ತಕ ಮಾರಾಟ ಪಟ್ಟಿ</strong>
            <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
              ಒಟ್ಟು ಪುಸ್ತಕ ಮಾರಾಟ ಸಂಖ್ಯೆ: {rows.length}
            </Typography>
          </div>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField select label="ಪೂರ್ಣ ವರದಿ" size="small" sx={{ minWidth: 150, marginLeft: 2 }}>
              <MenuItem value="all">ಪೂರ್ಣ ವರದಿ</MenuItem>
              <MenuItem value="active">ಆಜೀವ ಸದಸ್ಯರು</MenuItem>
              <MenuItem value="inactive">ವಾರ್ಷಿಕ  ಸದಸ್ಯರು</MenuItem>
              <MenuItem value="active">ಸಹಾಯ ಧನ </MenuItem>
              <MenuItem value="inactive">ಪುಸ್ತಕ ಮಾರಾಟ</MenuItem>
            </TextField>
            <TextField
              label="ಪ್ರಾರಂಭ ದಿನಾಂಕ"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="ಕೊನೆಯ ದಿನಾಂಕ"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <Button variant="contained" color="primary" style={{ backgroundColor: '#072E77' }}>
              ವರದಿಯನ್ನು ರಚಿಸಿ
            </Button>
            <Button variant="outlined" color="success">
              Excel Download
            </Button>
          </Box>
        </Box>

        {/* DataGrid */}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />

        {/* Footer Total */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
            fontWeight: "bold",
          }}
        >

          ಒಟ್ಟು ಮೊತ್ತ: ₹{" "}
          {rows.reduce((acc, row) => acc + row.amount, 0).toFixed(2)}
        </Box>
      </Box>
    </>
  );
}
