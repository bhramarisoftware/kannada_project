import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const initialData = [
  { id: 1, name: "ಕನ್ನಡ ಸಂಘಾಧ್ಯಕ್ಷರು", price: 195, tax: "5%" },
  { id: 2, name: "ಸಂಘಾಪ್ರಮಾಣಪತ್ರ", price: 195, tax: "5%" },
  { id: 3, name: "ಪಂಚಾಯತನ ದೇವತಾಪೂಜೆ", price: 195, tax: "5%" },
  { id: 4, name: "ವಿಶ್ವೇಶ್ವರಾಯಣ ಶ್ರದ್ಧಸಮಾರಂಭ", price: 195, tax: "5%" },
];

export default function CustomPage() {
  const navigate = useNavigate();

  const [rowsData, setRowsData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Popup form state
  const [openForm, setOpenForm] = useState(false);
  const [currentRow, setCurrentRow] = useState({
    id: null,
    name: "",
    price: "",
    tax: "5%",
  });

  const [error, setError] = useState(false);

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Back button
  const handleBack = () => {
    navigate(-1);
  };

  // Open Add Dialog
  const handleAdd = () => {
    setCurrentRow({ id: null, name: "", price: "", tax: "5%" });
    setError(false);
    setOpenForm(true);
  };

  // Open Edit Dialog
  const handleEdit = (row) => {
    setCurrentRow(row);
    setError(false);
    setOpenForm(true);
  };

  // Save Add/Edit
  const handleSave = () => {
    if (!currentRow.name || !currentRow.price) {
      setError(true);
      return;
    }
    if (currentRow.id) {
      setRowsData(rowsData.map((r) => (r.id === currentRow.id ? currentRow : r)));
    } else {
      const newRow = { ...currentRow, id: rowsData.length + 1 };
      setRowsData([...rowsData, newRow]);
    }
    setOpenForm(false);
  };

  // Cancel form
  const handleCancel = () => {
    setOpenForm(false);
  };

  // Open delete confirmation dialog
  const handleDelete = (row) => {
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    setRowsData(rowsData.filter((r) => r.id !== rowToDelete.id));
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
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

      <Box sx={{ p: 3 }}>
        {/* Back Button */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <ArrowBackIcon sx={{ mr: 1, cursor: "pointer" }} onClick={handleBack} />
          <Typography variant="body1" sx={{ cursor: "pointer" }} onClick={handleBack}>
            Back
          </Typography>
        </Box>

        {/* Page Title and Add Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">
            <b>ಪುಸ್ತಕ ದಾಸ್ತಾನು</b>
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            ಹೊಸ ಪುಸ್ತಕ ಸೇರಿಸಿ +
          </Button>
        </Box>
        <Typography variant="body1">ಒಟ್ಟು ಪುಸ್ತಕ ದಾಸ್ತಾನು - {rowsData.length}</Typography>

        {/* Table */}
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ background: "#f9f9f9" }}>
              <TableRow>
                <TableCell>ಕ್ರಮ ಸಂಖ್ಯೆ</TableCell>
                <TableCell>ಪುಸ್ತಕ ಹೆಸರು</TableCell>
                <TableCell>ಪುಸ್ತಕ ಬೆಲೆ</TableCell>
                <TableCell>ತೆರಿಗೆ ಬೆಲೆ</TableCell>
                <TableCell>ಕ್ರಿಯೆಗಳು</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{String(index + 1).padStart(2, "0")}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>₹ {row.price}</TableCell>
                    <TableCell>{row.tax}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(row)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton color="primary" onClick={() => handleEdit(row)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={rowsData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[4, 10, 20]}
          />
        </TableContainer>
      </Box>

      {/* Popup Form */}
      <Dialog open={openForm} onClose={handleCancel} maxWidth="md" fullWidth>
        <DialogTitle>{currentRow.id ? <b>ಪುಸ್ತಕ ತಿದ್ದುಪಡಿ</b> : <b>ಪುಸ್ತಕ ಸೇರಿಸಿ</b>}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <TextField
              label="ಪುಸ್ತಕ ಹೆಸರು"
              fullWidth
              value={currentRow.name}
              onChange={(e) => setCurrentRow({ ...currentRow, name: e.target.value })}
            />
            <TextField
              label="ಪುಸ್ತಕ ಬೆಲೆ"
              fullWidth
              value={currentRow.price}
              onChange={(e) => setCurrentRow({ ...currentRow, price: e.target.value })}
              InputProps={{
                startAdornment: <span style={{ marginRight: 4 }}>₹</span>,
              }}
            />
            <Select
              fullWidth
              value={currentRow.tax}
              onChange={(e) => setCurrentRow({ ...currentRow, tax: e.target.value })}
            >
              <MenuItem value="5%">5%</MenuItem>
              <MenuItem value="10%">10%</MenuItem>
              {/* <MenuItem value="15%">15%</MenuItem> */}
            </Select>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              ದಯವಿಟ್ಟು ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={handleCancel}>
              ರದ್ದು ಮಾಡಿ
            </Button>
            <Button variant="contained" sx={{ bgcolor: "#ff4a00" }} onClick={handleSave}>
              ಉಳಿಸಿ
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>ನೀವು ರದ್ದುಗೊಳಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?</DialogTitle>
        <DialogContent>
          <Typography>
            ನೀವು ರದ್ದುಗೊಳಿಸಿದ ನಂತರ ಇದು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಿಹೋಗುತ್ತದೆ
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="error">
            ಇಲ್ಲ
          </Button>
          <Button onClick={handleConfirmDelete}>
            ಹೌದು,
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
