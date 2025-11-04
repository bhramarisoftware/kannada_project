
import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export default function CustomPage() {
  const navigate = useNavigate();

  const [rowsData, setRowsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openForm, setOpenForm] = useState(false);
  const [currentRow, setCurrentRow] = useState({ id: null, name: "" });
  const [error, setError] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/expense-categories");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setRowsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBack = () => navigate(-1);

  const handleAdd = () => {
    setCurrentRow({ id: null, name: "" });
    setError(false);
    setOpenForm(true);
  };

  // ✅ Save (Only POST, no PUT)
  const handleSave = async () => {
    if (!currentRow.name.trim()) {
      setError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/expense-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: currentRow.name }),
      });

      if (!response.ok) throw new Error("Failed to save data");

      await fetchData();
      setOpenForm(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleCancel = () => setOpenForm(false);

  const handleDelete = (row) => {
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/expense-categories/${rowToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete data");

      await fetchData();
      setDeleteDialogOpen(false);
      setRowToDelete(null);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

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

      <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>

        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            {/* Back Button */}
            <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleBack}>
              <Typography variant="body1" sx={{ fontSize: "20px", fontWeight: 500 }}>
                &lt;&nbsp;&nbsp; Back
              </Typography>
            </Box>

            {/* Add New Button */}
            <Button variant="contained" style={{ backgroundColor: "#072E77" }} onClick={handleAdd}>
              ಹೊಸ ಖರ್ಚು ವಿಭಾಗ +
            </Button>

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
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6"><b>ಖರ್ಚು ವಿಭಾಗ</b></Typography>
            </Box>

            <Typography variant="body1">ಒಟ್ಟು ಖರ್ಚು ವಿಭಾಗ ಸಂಖ್ಯೆ - {rowsData.length}</Typography>

            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead sx={{ background: "#f9f9f9" }}>
                  <TableRow>
                    <TableCell>ಕ್ರಮ ಸಂಖ್ಯೆ</TableCell>
                    <TableCell>ಖರ್ಚು ವಿಭಾಗದ ಹೆಸರು</TableCell>
                    <TableCell>ಕ್ರಿಯೆಗಳು</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{String(index + 1).padStart(2, "0")}</TableCell>
                      <TableCell>{row.name}</TableCell>

                      <TableCell>
                        <IconButton color="error" onClick={() => handleDelete(row)}>
                          <DeleteIcon />
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

          <Dialog open={openForm} onClose={handleCancel} maxWidth="md" fullWidth>
            <DialogTitle><b>ಹೊಸ ಖರ್ಚು ವಿಭಾಗ ಸೇರಿಸಿ</b></DialogTitle>
            <hr style={{ width: "95%", marginBottom: "10px", color: "#222B45" }} />
            <DialogContent>
              <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                <TextField
                  label="ಖರ್ಚು ವಿಭಾಗದ ಹೆಸರು"
                  fullWidth
                  value={currentRow.name}
                  onChange={(e) => setCurrentRow({ ...currentRow, name: e.target.value })}
                />
              </Box>

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  ದಯವಿಟ್ಟು ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ
                </Typography>
              )}

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                <Button variant="outlined" onClick={handleCancel}>ರದ್ದು ಮಾಡಿ</Button>
                <Button variant="contained" sx={{ bgcolor: "#ff4a00" }} onClick={handleSave}>ಉಳಿಸಿ</Button>
              </Box>
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
            <DialogTitle>ನೀವು ರದ್ದುಗೊಳಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?</DialogTitle>
            <DialogContent>
              <Typography>ನೀವು ರದ್ದುಗೊಳಿಸಿದ ನಂತರ ಇದು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಿಹೋಗುತ್ತದೆ</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete} color="error">ಇಲ್ಲ</Button>
              <Button onClick={handleConfirmDelete}>ಹೌದು</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </>

  );
}
