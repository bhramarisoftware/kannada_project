import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import PrintIcon from "@mui/icons-material/Print";

const initialRows = [
    { id: 1, name: " ", price: 1000, quantity: 1, tax: 10, total: (1000 + 10) * 1 },
];

export default function KannadaPage() {
    const [rows, setRows] = useState(initialRows);

    const [mobileNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");

    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [extraDesc, setExtraDesc] = useState("");
    const [extraPrice, setExtraPrice] = useState("");

    const [place, setPlace] = useState("");
    const [aadhar, setAadhar] = useState("");
    const [pan, setPan] = useState("");
    const [otherId, setOtherId] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("ರೂಪಾಯ - ₹");
    const [paymentAmount, setPaymentAmount] = useState("");

    const [showPreview, setShowPreview] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    // Add new product
    const handleAddProduct = () => {
        const newRow = {
            id: rows.length + 1,
            name: productName,
            price: 1000,
            quantity: quantity,
            tax: 10,
            total: (1000 + 10) * quantity,
        };
        setRows([...rows, newRow]);
        setProductName("");
        setQuantity(1);
    };

    // Update quantity inside table
    const handleQuantityChange = (id, newQty) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === id
                    ? { ...row, quantity: newQty, total: (row.price + row.tax) * newQty }
                    : row
            )
        );
    };

    // Cancel / Reset all form fields and table
    const handleCancel = () => {
        setMobileNumber("");
        setName("");
        setDate("");
        setProductName("");
        setQuantity(1);
        setExtraDesc("");
        setExtraPrice("");
        setPlace("");
        setAadhar("");
        setPan("");
        setOtherId("");
        setPaymentMethod("ರೂಪಾಯ - ₹");
        setPaymentAmount("");
        setRows([...initialRows]);
        setShowPreview(false);
    };

    // Totals
    const totalQuantity = rows.reduce((acc, row) => acc + row.quantity, 0);
    const totalAmount = rows.reduce((acc, row) => acc + row.total, 0);
    const totalWithExtra = totalAmount + Number(extraPrice || 0);
    const finalPayable = totalWithExtra - Number(paymentAmount || 0);

    return (
        <Box sx={{ p: 3, fontFamily: "Arial" }}>
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

            {/* Title */}
            <div
                className="members-back-btn"
                onClick={() => window.history.back()}
                style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginBottom: "15px",
                }}
            >
                <span>← </span>ಪುಸ್ತಕ ಮಾರಾಟ
            </div>

            {/* Inputs */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    label="ಮೊಬೈಲ್ ಸಂಖ್ಯೆ "
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="ಶ್ರೀಮತಿ ಶ್ರೀ / ಸದಸ್ಯರ ಹೆಸರು"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    type="date"
                    fullWidth
                    label="ದಿನಾಂಕ"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Box>

            {/* Product row */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    label="ಪುಸ್ತಕ ಹೆಸರು"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <TextField
                    type="number"
                    label="ಸಂಖ್ಯೆ"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    sx={{ width: 100 }}
                />
                <Button
                    variant="contained"
                    color="warning"
                    onClick={handleAddProduct}
                    startIcon={<AddIcon />}
                >
                    ಖರೀದಿಯನ್ನು ಸೇರಿಸಿ
                </Button>
            </Box>

            {/* Table */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginBottom: 20,
                    textAlign: "center",
                }}
            >
                <thead>
                    <tr style={{ background: "#eee" }}>
                        <th>ಕ್ರಮ ಸಂಖ್ಯೆ</th>
                        <th>ಪುಸ್ತಕಗಳ ಹೆಸರು</th>
                        <th>ಪುಸ್ತಕ ಬೆಲೆ</th>
                        <th>ಪುಸ್ತಕಗಳ ಸಂಖ್ಯೆ</th>
                        <th>ತೆರಿಗೆ ಬೆಲೆ</th>
                        <th>ಒಟ್ಟು ಬೆಲೆ</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id} style={{ borderBottom: "1px solid #ccc" }}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>₹ {row.price}</td>
                            <td>
                                <TextField
                                    type="number"
                                    value={row.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(row.id, Number(e.target.value))
                                    }
                                    size="small"
                                    sx={{ width: 60 }}
                                />
                            </td>
                            <td>₹ {row.tax}</td>
                            <td>₹ {row.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Extra product */}
            <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                <TextField
                    label="ಇತರ ಮಾಹಿತಿ"
                    value={extraDesc}
                    onChange={(e) => setExtraDesc(e.target.value)}
                />
                <Box sx={{ display: "flex", gap: 20 }}>
                    <TextField
                        type="number"
                        label="ಇತರ ಬೆಲೆ"
                        value={extraPrice}
                        onChange={(e) => setExtraPrice(e.target.value)}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 25, mb: 2 }}>
                        <Typography>ಒಟ್ಟು ಪುಸ್ತಕ: {totalQuantity}</Typography>
                        <Typography>ಒಟ್ಟು ಖರೀದಿ ಬೆಲೆ: ₹ {totalAmount}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* IDs */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, mb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel>ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ</InputLabel>
                    <Select value={place} onChange={(e) => setPlace(e.target.value)}>
                        <MenuItem value="ನಗದು">ನಗದು</MenuItem>
                        <MenuItem value="Cheque">Cheque</MenuItem>
                    </Select>
                </FormControl>
                <TextField label="AADHAR NO" value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
                <TextField label="PAN NO" value={pan} onChange={(e) => setPan(e.target.value)} />
                <TextField label="ರಶೀದಿ ಸಂಖ್ಯೆ " value={otherId} onChange={(e) => setOtherId(e.target.value)} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>ರಿಯಾಯಿತಿ</InputLabel>
                    <Select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <MenuItem value="ರೂಪಾಯಿ- ₹">ರೂಪಾಯಿ - ₹</MenuItem>
                        <MenuItem value="ಡಾಲರ್ $">ಡಾಲರ್ $</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type="number"
                    label="ರೂಪಾಯಿ-₹"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                />
                <Typography>ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು ಮೊತ್ತ ₹ {finalPayable}</Typography>
                <InfoIcon color="action" />
                <TextField
                    label="ಪಾವತಿಸಲು ಬಾಕಿ ಇರುವ  ಮೊತ್ತ"
                    value={Math.max(finalPayable, 0)}
                    InputProps={{ readOnly: true }}
                />
                <Typography>ಸ್ವೀಕರಿಸುತ್ತಿರುವ ಮೊತ್ತ ₹ {paymentAmount || 0}</Typography>
                {/* Buttons */}
                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setShowCancelDialog(true)}
                    >
                        ರದ್ದು ಮಾಡಿ
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{ ml: "auto" }}
                        onClick={() => setShowPreview(true)}
                    >
                        ಮುಂದುವರಿಯಿರಿ →
                    </Button>
                </Box>
            </Box>

            {/* ✅ Dialog Popup */}
            <Dialog open={showPreview} onClose={() => setShowPreview(false)}>
                <DialogTitle>ಖರೀದಿಯ ಸಂಪೂರ್ಣ ವಿವರಗಳು</DialogTitle>
                <DialogContent dividers>
                    <Typography>ಒಟ್ಟು ಖರೀದಿ ಮೊತ್ತ: ₹ {totalWithExtra}</Typography>
                    <Typography>ರಿಯಾಯಿತಿ ಮೊತ್ತ: ₹ {paymentAmount || 0}</Typography>
                    <Typography>ಪಾವತಿಸಲು ಬಾಕಿ ಇರುವ ಮೊತ್ತ: ₹ {Math.max(finalPayable, 0)}</Typography>
                    <Typography>ಸ್ವೀಕರಿಸುತ್ತಿರುವ ಮೊತ್ತ: ₹ {paymentAmount || 0}</Typography>
                    <Typography sx={{ mt: 2, color: "red", fontWeight: "bold" }}>
                        ಬದಲಾವಣೆಗಳಿವೆ
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowPreview(false)} variant="contained" color="warning">
                        ಸರಿ, ಮುಂದುವರಿಯಿರಿ
                    </Button>

                </DialogActions>

            </Dialog>
            <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
                <DialogTitle>ನಿರ್ಗಮನ ದೃಢೀಕರಣ</DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        ನೀವು ನಿರ್ಗಮಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ? ಹೌದು ಎಂದಾದರೆ, ಅದನ್ನು ಉಳಿಸಲಾಗುವುದಿಲ್ಲ.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowCancelDialog(false)} color="error">
                       ಈ ಪುಟದಿಂದ ನಿರ್ಗಮಿಸ
                    </Button>
                    <Button
                        onClick={() => {
                            handleCancel(); // your existing cancel logi
                            setShowCancelDialog(false);
                        }}
                        color=""
                        
                    >
                        ಈ ಪುಟದಲ್ಲಿ ಇರಿ
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
