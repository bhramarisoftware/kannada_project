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
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";


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

    // Extra fields state (separate from main fields)
    const [extraPlace, setExtraPlace] = useState("");
    const [extraAadhar, setExtraAadhar] = useState("");
    const [extraPan, setExtraPan] = useState("");
    const [extraOtherId, setExtraOtherId] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("ರೂಪಾಯ - ₹");
    const [paymentAmount, setPaymentAmount] = useState("");

    const [showPreview, setShowPreview] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const [showExtraFields, setShowExtraFields] = useState(false);

    const [chequeNumber, setChequeNumber] = useState("");
    const [extraChequeNumber, setExtraChequeNumber] = useState("");

    const navigate = useNavigate();


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
                {/* Save sales data and navigate to Booklist */}
                <Button
                    style={{ display: "none" }}
                    id="saveAndNavigateBookSales"
                    onClick={() => {
                        // Prepare sales data for Booklist
                        const salesData = rows.map((row) => ({
                            id: row.id,
                            receiptNo: otherId || `R${row.id}`,
                            date: date,
                            count: row.quantity,
                            amount: `₹ ${row.total}`,
                            mode: place,
                            customer: name,
                        }));
                        localStorage.setItem("bookSalesList", JSON.stringify(salesData));
                        navigate("/Booklist");
                    }}
                />

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
        setExtraPlace("");
        setExtraAadhar("");
        setExtraPan("");
        setExtraOtherId("");
        setPaymentMethod("ರೂಪಾಯ - ₹");
        setPaymentAmount("");
        setRows([...initialRows]);
        setShowPreview(false);
        setShowExtraFields(false);
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
                    freeSolo
                    select
                    label="ಪುಸ್ತಕ ಹೆಸರು"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                >
                    <MenuItem value="ಕನ್ನಡ ಸಂಧ್ಯಾಭಾಷ್ಯ – 195/-">ಕನ್ನಡ ಸಂಧ್ಯಾಭಾಷ್ಯ – 195/-</MenuItem>
                    <MenuItem value="ಸಂಧ್ಯಾವಂದನಮ್ – 75/-">ಸಂಧ್ಯಾವಂದನಮ್ – 75/-</MenuItem>
                    <MenuItem value="ಪಂಚಾಯತನ ದೇವರಪೂಜೆ – 90/-">ಪಂಚಾಯತನ ದೇವರಪೂಜೆ – 90/-</MenuItem>
                    <MenuItem value="ವಿಷ್ಣುಪ್ರೋಕ್ತ ಶಿವಸಹಸ್ರನಾಮ – 60/-">ವಿಷ್ಣುಪ್ರೋಕ್ತ ಶಿವಸಹಸ್ರನಾಮ – 60/-</MenuItem>
                    <MenuItem value="ಆದಿತ್ಯಾದಿ ನವಗ್ರಹಪೂಜಾ ವಿಧಿಃ – 105/-">ಆದಿತ್ಯಾದಿ ನವಗ್ರಹಪೂಜಾ ವಿಧಿಃ – 105/-</MenuItem>
                    <MenuItem value="ಮಂತ್ರಮಂಜರೀ – 195/-">ಮಂತ್ರಮಂಜರೀ – 195/-</MenuItem>
                    <MenuItem value="ನಿತ್ಯೋಪಾಸನಪದ್ಧತಿಃ – 105/-">ನಿತ್ಯೋಪಾಸನಪದ್ಧತಿಃ – 105/-</MenuItem>
                    <MenuItem value="ವೈದಿಕಸಂಭಾರಃ – 90/-">ವೈದಿಕಸಂಭಾರಃ – 90/-</MenuItem>
                    <MenuItem value="ಸತ್ಯನಾರಾಯಣ ಷಟ್ಪದಿ – 36/-">ಸತ್ಯನಾರಾಯಣ ಷಟ್ಪದಿ – 36/-</MenuItem>
                    <MenuItem value="ವೇದ-ವೇದಾಂಗ ಪರಿವಾರ(ಕೆಲವೇ ಪ್ರತಿಗಳು ಲಭ್ಯ) – 255/-">ವೇದ-ವೇದಾಂಗ ಪರಿವಾರ(ಕೆಲವೇ ಪ್ರತಿಗಳು ಲಭ್ಯ) – 255/-</MenuItem>
                    <MenuItem value="ಭಗವತ್ಪಾದ ಶ್ರೀ ಶಂಕಕರಾಚಾರ್ಯರು – 60/-">ಭಗವತ್ಪಾದ ಶ್ರೀ ಶಂಕಕರಾಚಾರ್ಯರು – 60/-</MenuItem>
                    <MenuItem value="ಶ್ರೀ ಸತ್ಯಗಣಪತಿವ್ರತವಿಧಿಃ – 165/-">ಶ್ರೀ ಸತ್ಯಗಣಪತಿವ್ರತವಿಧಿಃ – 165/-</MenuItem>
                    <MenuItem value="ಶ್ಲೋಕಸಮಾಹಾರಃ-೨ – 50/-">ಶ್ಲೋಕಸಮಾಹಾರಃ-೨ – 50/-</MenuItem>
                    <MenuItem value="ಪುರಾಣಲೋಕ – (ಕೆಲವೇ ಪ್ರತಿಗಳು ಲಭ್ಯ) – 345/-">ಪುರಾಣಲೋಕ – (ಕೆಲವೇ ಪ್ರತಿಗಳು ಲಭ್ಯ) – 345/-</MenuItem>
                    <MenuItem value="ಶ್ರೀಗಂಗಾಕಲ್ಪೋಕ್ತಪೂಜಾವಿಧಿಃ, ಕನ್ನಡ – 45/-">ಶ್ರೀಗಂಗಾಕಲ್ಪೋಕ್ತಪೂಜಾವಿಧಿಃ, ಕನ್ನಡ – 45/-</MenuItem>
                    <MenuItem value="ಶ್ರೀಗಂಗಾಕಲ್ಪೋಕ್ತಪೂಜಾವಿಧಿಃ , ಸಂಸ್ಕೃತ – 36/-">ಶ್ರೀಗಂಗಾಕಲ್ಪೋಕ್ತಪೂಜಾವಿಧಿಃ , ಸಂಸ್ಕೃತ – 36/-</MenuItem>
                    <MenuItem value="ತ್ಯಾಗರಾಜರ ಘನರಾಗಪಂಚರತ್ನ ಕೀರ್ತನೆಗಳು – 105/-">ತ್ಯಾಗರಾಜರ ಘನರಾಗಪಂಚರತ್ನ ಕೀರ್ತನೆಗಳು – 105/-</MenuItem>
                    <MenuItem value="ನವಾಗಾರಪ್ರವೇಶವಿಧಿಃ – 150/-">ನವಾಗಾರಪ್ರವೇಶವಿಧಿಃ – 150/-</MenuItem>
                    <MenuItem value="ಗೋದಾನಾದಿ ವಿಧಾನಮ್ – 100/-">ಗೋದಾನಾದಿ ವಿಧಾನಮ್ – 100/-</MenuItem>
                    <MenuItem value="ಶ್ರೀಕೃಷ್ಣವ್ರತಕಲ್ಪೋಕ್ತಪೂಜಾ – 90/-">ಶ್ರೀಕೃಷ್ಣವ್ರತಕಲ್ಪೋಕ್ತಪೂಜಾ – 90/-</MenuItem>
                    <MenuItem value="ಪುರೋಹಿತಸ್ಮರಣ – 270/-">ಪುರೋಹಿತಸ್ಮರಣ – 270/-</MenuItem>
                    <MenuItem value="ಶ್ರೀಸತ್ಯನಾರಾಯಣಪೂಜಾವಿಧಿಃ – 135/-">ಶ್ರೀಸತ್ಯನಾರಾಯಣಪೂಜಾವಿಧಿಃ – 135/-</MenuItem>
                    <MenuItem value="ನಿತ್ಯಾಚಾರಗಳ ಮಹತ್ವ – 40/-">ನಿತ್ಯಾಚಾರಗಳ ಮಹತ್ವ – 40/-</MenuItem>
                    <MenuItem value="ಸೌಂದರ್ಯ ಸೋಪಾನ – 330/-">ಸೌಂದರ್ಯ ಸೋಪಾನ – 330/-</MenuItem>
                    <MenuItem value="ಯಕ್ಷಗಾನ ಪ್ರಸಂಗಮಾಲಿಕಾ -೨">ಯಕ್ಷಗಾನ ಪ್ರಸಂಗಮಾಲಿಕಾ -೨</MenuItem>
                    <MenuItem value="ಪುರೋಹಿತಪ್ರವರ ಮಿತ್ತೂರು ತಿಮ್ಮಯ್ಯ ಭಟ್ಟರು – 60/-">ಪುರೋಹಿತಪ್ರವರ ಮಿತ್ತೂರು ತಿಮ್ಮಯ್ಯ ಭಟ್ಟರು – 60/-</MenuItem>
                    <MenuItem value="ಸಂಸ್ಕಾರವಿವರಣೆ – 100/-">ಸಂಸ್ಕಾರವಿವರಣೆ – 100/-</MenuItem>
                    <MenuItem value="ಶ್ರೀಘೇರಂಡಸಂಹಿತಾ – 200/-">ಶ್ರೀಘೇರಂಡಸಂಹಿತಾ – 200/-</MenuItem>
                    <MenuItem value="ಶ್ರೀರಾಮಕಲ್ಪೋಕ್ತಪೂಜಾ – 75/-">ಶ್ರೀರಾಮಕಲ್ಪೋಕ್ತಪೂಜಾ – 75/-</MenuItem>
                    <MenuItem value="ಬಡೆಕ್ಕಿಲ ವಂಶಪರಂಪರೆ – 180/-">ಬಡೆಕ್ಕಿಲ ವಂಶಪರಂಪರೆ – 180/-</MenuItem>
                    <MenuItem value="ಹಿರಿಯರಿವರು – 180/-">ಹಿರಿಯರಿವರು – 180/-</MenuItem>
                    <MenuItem value="ಭಾಗವತಸಪ್ತಾಹಯಜ್ಞ – 195/-">ಭಾಗವತಸಪ್ತಾಹಯಜ್ಞ – 195/-</MenuItem>
                    <MenuItem value="ಹಠಪ್ರದೀಪಿಕಾ – (ಯೋಗಗ್ರಂಥ)">ಹಠಪ್ರದೀಪಿಕಾ – (ಯೋಗಗ್ರಂಥ)</MenuItem>
                    <MenuItem value="ಶ್ರೀಮದ್ಭಾಗವತಂ – (ಕೆಲವೇ ಪ್ರತಿಗಳು ಲಭ್ಯ)">ಶ್ರೀಮದ್ಭಾಗವತಂ – (ಕೆಲವೇ ಪ್ರತಿಗಳು ಲಭ್ಯ)</MenuItem>

                </TextField>
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
                    marginBottom: 30,
                    textAlign: "center",
                }}
            >
                <thead>
                    <tr style={{ background: "#eee" }}>
                        <th style={{ padding: "16px 8px" }}>ಕ್ರಮ ಸಂಖ್ಯೆ</th>
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
                <Box sx={{ display: "flex", gap: 55 }}>
                    <TextField
                        type="number"
                        label="ಇತರ ಬೆಲೆ"
                        value={extraPrice}
                        onChange={(e) => setExtraPrice(e.target.value)}
                    />
                    <Box sx={{ display: "flex ", justifyContent: "flex-end", gap: 30, mb: 2 }}>
                        <Typography>ಒಟ್ಟು ಪುಸ್ತಕ: {totalQuantity}</Typography>
                        <Typography>ಒಟ್ಟು ಖರೀದಿ ಬೆಲೆ: ₹ {totalAmount}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* IDs */}
            <div>
                <FormControl style={{ width: 330, marginBottom: 20, marginRight: 20 }}>
                    <InputLabel>ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ</InputLabel>
                    <Select value={place} onChange={(e) => setPlace(e.target.value)}>
                        <MenuItem value="ನಗದು">ನಗದು</MenuItem>
                        <MenuItem value="Cheque">Cheque</MenuItem>
                        <MenuItem value="DD">DD</MenuItem>
                    </Select>
                </FormControl>
                {(place === "Cheque" || place === "DD") && (
                    <TextField
                        label={place === "Cheque" ? "Cheque ಸಂಖ್ಯೆ" : "DD ಸಂಖ್ಯೆ"}
                        value={chequeNumber}
                        onChange={(e) => setChequeNumber(e.target.value)}
                        style={{ width: 310, marginRight: 20 }}
                    />
                )}
                <TextField label="AADHAR NO" value={aadhar} onChange={(e) => setAadhar(e.target.value)} style={{ width: 330, marginRight: 20 }} />
                <TextField label="PAN NO" value={pan} onChange={(e) => setPan(e.target.value)} style={{ width: 330, marginRight: 20 }} />
                <TextField label="ರಶೀದಿ ಸಂಖ್ಯೆ " value={otherId} onChange={(e) => setOtherId(e.target.value)} style={{ width: 330, marginRight: 20, marginBottom: 20 }} />
                <Button
                    variant="contained"
                    color="white"
                    onClick={() => setShowExtraFields(prev => !prev)}
                    sx={{
                        minWidth: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        p: 0,
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                    }}
                >
                    +
                </Button>
            </div>

            {showExtraFields && (
                <div>
                    <FormControl style={{ width: 300, marginBottom: 20, marginRight: 20 }}>
                        <InputLabel>ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ</InputLabel>
                        <Select value={extraPlace} onChange={(e) => setExtraPlace(e.target.value)}>
                            <MenuItem value="ನಗದು">ನಗದು</MenuItem>
                            <MenuItem value="Cheque">Cheque</MenuItem>
                            <MenuItem value="DD">DD</MenuItem>
                        </Select>
                    </FormControl>
                    {(extraPlace === "Cheque" || extraPlace === "DD") && (
                        <TextField
                            label={extraPlace === "Cheque" ? "Cheque ಸಂಖ್ಯೆ" : "DD ಸಂಖ್ಯೆ"}
                            value={extraChequeNumber}
                            onChange={(e) => setExtraChequeNumber(e.target.value)}
                            style={{ width: 250, marginRight: 20 }}
                        />
                    )}
                    <TextField label="AADHAR NO" value={extraAadhar} onChange={(e) => setExtraAadhar(e.target.value)} style={{ width: 250, marginRight: 20 }} />
                    <TextField label="PAN NO" value={extraPan} onChange={(e) => setExtraPan(e.target.value)} style={{ width: 250, marginRight: 20 }} />
                    <TextField label="ರಶೀದಿ ಸಂಖ್ಯೆ " value={extraOtherId} onChange={(e) => setExtraOtherId(e.target.value)} style={{ width: 250, marginRight: 20 }} />
                    <TextField label="ಹಣವನ್ನು ಸ್ವೀಕರಿಸಲಾಗುತ್ತಿದೆ " value={extraOtherId} onChange={(e) => setExtraOtherId(e.target.value)} style={{ width: 250, marginRight: 20 }} />
                    {/* 🆕 Delete button – only visible if extra fields are shown */}
                    {showExtraFields && (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                setShowExtraFields(false);
                                setExtraPlace("");
                                setExtraAadhar("");
                                setExtraPan("");
                                setExtraOtherId("");
                            }}
                            sx={{ minWidth: 0, p: 1, height: 40 }}
                        >
                            <DeleteIcon />
                        </Button>
                    )}
                </div>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 3 }}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>ರಿಯಾಯಿತಿ</InputLabel>
                    <Select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <MenuItem value="ರೂಪಾಯಿ- ₹">ರೂಪಾಯಿ - ₹</MenuItem>
                        <MenuItem value="ಶೇಕಡಾವಾರು - %">ಶೇಕಡಾವಾರು-%</MenuItem>
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
                <Box sx={{ display: "flex", gap: 2, mt: 2, marginLeft: 'auto' }}>
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
            <Dialog open={showPreview} onClose={() => setShowPreview(false)}
                PaperProps={{
                    sx: {
                        width: "500px",      // fixed width
                        maxWidth: "90vw",    // prevent overflow on small screens
                        height: "300px",     // optional fixed height
                        maxHeight: "80vh",   // prevent overflow vertically
                        p: 2                 // optional padding inside Paper
                    }
                }}
            >
                
                <DialogTitle>ಖರೀದಿಯ ಸಂಪೂರ್ಣ ವಿವರಗಳು</DialogTitle>
                <DialogContent dividers>
                    <Typography>ಒಟ್ಟು ಖರೀದಿ ಮೊತ್ತ: ₹ {totalWithExtra}</Typography>
                    <Typography>ರಿಯಾಯಿತಿ ಮೊತ್ತ: ₹ {paymentAmount || 0}</Typography>
                    <Typography>ಪಾವತಿಸಲು ಬಾಕಿ ಇರುವ ಮೊತ್ತ: ₹ {Math.max(finalPayable, 0)}</Typography>
                    <Typography>ಸ್ವೀಕರಿಸುತ್ತಿರುವ ಮೊತ್ತ: ₹ {paymentAmount || 0}</Typography>

                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button
                            sx={{ mt: 2, color: "red", fontWeight: "bold" }}
                            onClick={() => setShowPreview(false)}   // go to previous page
                        >
                            ಬದಲಾವಣೆಗಳಿವೆ
                        </Button>
                        <Button
                            onClick={() => {
                                // Prepare sales data for Booklist
                                const salesData = rows.map((row) => ({
                                    id: row.id,
                                    receiptNo: otherId || `R${row.id}`,
                                    date: date,
                                    count: row.quantity,
                                    amount: `₹ ${row.total}`,
                                    mode: place,
                                    customer: name,
                                }));
                                localStorage.setItem("bookSalesList", JSON.stringify(salesData));
                                navigate("/Booklist");
                            }}
                            variant="contained"
                            color="warning"
                        >
                            ಸರಿ, ಮುಂದುವರಿಯಿರಿ
                        </Button>
                    </Box>

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