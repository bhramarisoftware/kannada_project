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

    IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";


const BOOKS = [
    { name: "ಕನ್ನಡ ಸಂಧ್ಯಾಭಾಷ್ಯ", price: 195 },
    { name: "ಸಂಧ್ಯಾವಂದನಮ್", price: 75 },
    { name: "ಪಂಚಾಯತನ ದೇವರಪೂಜೆ", price: 90 },
    { name: "ವಿಷ್ಣುಪ್ರೋಕ್ತ ಶಿವಸಹಸ್ರನಾಮ", price: 60 },
    { name: "ಆದಿತ್ಯಾದಿ ನವಗ್ರಹಪೂಜಾ ವಿಧಿಃ", price: 105 },
    { name: "ಮಂತ್ರಮಂಜರೀ", price: 195 },
    { name: "ನಿತ್ಯೋಪಾಸನಪದ್ಧತಿಃ", price: 105 },
    { name: "ವೈದಿಕಸಂಭಾರಃ", price: 90 },
    { name: "ಸತ್ಯನಾರಾಯಣ ಷಟ್ಪದಿ", price: 36 },
    { name: "ವೇದ-ವೇದಾಂಗ ಪರಿವಾರ(ಕೆಲವೇ ಪ್ರತಿಗಳು ಲಭ್ಯ)", price: 255 },
    { name: "ಭಗವತ್ಪಾದ ಶ್ರೀ ಶಂಕಕರಾಚಾರ್ಯರು", price: 60 },
    { name: "ಶ್ರೀ ಸತ್ಯಗಣಪತಿವ್ರತವಿಧಿಃ", price: 165 },
    { name: "ಶ್ಲೋಕಸಮಾಹಾರಃ-೨", price: 50 },
    { name: "ಪುರಾಣಲೋಕ – (ಕೆಲವೇ ಪ್ರತಿಗಳು ಲಭ್ಯ)", price: 345 },
    { name: "ಶ್ರೀಗಂಗಾಕಲ್ಪೋಕ್ತಪೂಜಾವಿಧಿಃ, ಕನ್ನಡ", price: 45 },
    { name: "ಶ್ರೀಗಂಗಾಕಲ್ಪೋಕ್ತಪೂಜಾವಿಧಿಃ , ಸಂಸ್ಕೃತ", price: 36 },
    { name: "ತ್ಯಾಗರಾಜರ ಘನರಾಗಪಂಚರತ್ನ ಕೀರ್ತನೆಗಳು", price: 105 },
    { name: "ನವಾಗಾರಪ್ರವೇಶವಿಧಿಃ", price: 150 },
    { name: "ಗೋದಾನಾದಿ ವಿಧಾನಮ್", price: 100 },
    { name: "ಶ್ರೀಕೃಷ್ಣವ್ರತಕಲ್ಪೋಕ್ತಪೂಜಾ", price: 90 },
    { name: "ಪುರೋಹಿತಸ್ಮರಣ", price: 270 },
    { name: "ಶ್ರೀಸತ್ಯನಾರಾಯಣಪೂಜಾವಿಧಿಃ", price: 135 },
    { name: "ನಿತ್ಯಾಚಾರಗಳ ಮಹತ್ವ", price: 40 },
    { name: "ಸೌಂದರ್ಯ ಸೋಪಾನ", price: 330 },
    { name: "ಯಕ್ಷಗಾನ ಪ್ರಸಂಗಮಾಲಿಕಾ -೨", price: 0 },
    { name: "ಪುರೋಹಿತಪ್ರವರ ಮಿತ್ತೂರು ತಿಮ್ಮಯ್ಯ ಭಟ್ಟರು", price: 60 },
    { name: "ಸಂಸ್ಕಾರವಿವರಣೆ", price: 100 },
    { name: "ಶ್ರೀಘೇರಂಡಸಂಹಿತಾ", price: 200 },
    { name: "ಶ್ರೀರಾಮಕಲ್ಪೋಕ್ತಪೂಜಾ", price: 75 },
    { name: "ಬಡೆಕ್ಕಿಲ ವಂಶಪರಂಪರೆ", price: 180 },
    { name: "ಹಿರಿಯರಿವರು", price: 180 },
    { name: "ಭಾಗವತಸಪ್ತಾಹಯಜ್ಞ", price: 195 },
    { name: "ಹಠಪ್ರದೀಪಿಕಾ – (ಯೋಗಗ್ರಂಥ)", price: 0 },
    { name: "ಶ್ರೀಮದ್ಭಾಗವತಂ – (ಕೆಲವೇ ಪ್ರತಿಗಳು ಲಭ್ಯ)", price: 0 },

];


export default function KannadaPage() {
    const [rows, setRows] = useState([]);

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
    const [amountReceived, setAmountReceived] = useState("");


    // Extra fields state (separate from main fields)
    const [extraPlace, setExtraPlace] = useState("");
    const [extraAadhar, setExtraAadhar] = useState("");
    const [extraPan, setExtraPan] = useState("");
    const [extraOtherId, setExtraOtherId] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");

    const [showPreview, setShowPreview] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const [showExtraFields, setShowExtraFields] = useState(false);

    const [chequeNumber, setChequeNumber] = useState("");
    const [extraChequeNumber, setExtraChequeNumber] = useState("");

    const navigate = useNavigate();

    const [extraFields, setExtraFields] = useState([]);

    const [price, setPrice] = useState(0);

    const [open, setOpen] = useState(false);

    const [receivedAmount, setReceivedAmount] = useState("");



    // All states at top of component
    // your other dialog
    const [openAmountDialog, setOpenAmountDialog] = useState(false);  // NEW

    // Functions to open & close amount dialog
    const handleAmountOpen = () => setOpenAmountDialog(true);
    const handleAmountClose = () => setOpenAmountDialog(false);


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
    {/* Save sales data and navigate to Booklist */ }
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
    const remainingAmount = finalPayable - Number(receivedAmount || 0);

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
            <Box sx={{ p: 3, fontFamily: "Arial" }}>


                {/* Title */}
                <div
                    className="members-back-btn"
                    onClick={() => window.history.back()}
                    style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        cursor: "pointer",

                        backgroundColor: "#f5f5f5",
                        paddingTop: "1%",
                        paddingBottom: "1%",
                    }}
                >
                    &lt; &nbsp;&nbsp;  ಪುಸ್ತಕ ಮಾರಾಟ
                </div>

                <Box
                    sx={{
                        bgcolor: "white",
                        p: 1.5,
                        borderRadius: 1,
                        boxShadow: 1,
                        mb: 3,
                        position: "relative",
                    }}
                >
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
                            select
                            label="ಪುಸ್ತಕ ಹೆಸರು"
                            value={productName}
                            onChange={(e) => {
                                const selectedBook = BOOKS.find(b => b.name === e.target.value);
                                setProductName(selectedBook.name);
                                setPrice(selectedBook.price);
                            }}
                        >
                            {BOOKS.map((book, index) => (
                                <MenuItem key={index} value={book.name}>
                                    {book.name} – ₹{book.price}
                                </MenuItem>
                            ))}
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
                            onClick={() => {
                                const newRow = {
                                    id: rows.length + 1,
                                    name: productName,
                                    price: price,
                                    quantity: quantity,
                                    tax: 10,
                                    total: (price + 10) * quantity,
                                };
                                setRows([...rows, newRow]);
                            }}
                            startIcon={<AddIcon />}
                        >
                            ಖರೀದಿಯನ್ನು ಸೇರಿಸಿ
                        </Button>
                    </Box>
                </Box>


                <Box
                    sx={{
                        bgcolor: "white",
                        p: 1.5,
                        borderRadius: 1,
                        boxShadow: 1,
                        mb: 3,
                        position: "relative",
                    }}
                >

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
                    <Box sx={{ display: "flex", gap: 3, mb: 2, width: '100%' }}>
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
                            <Box sx={{ display: "flex", mb: 2 }}>
                                <Typography>ಒಟ್ಟು ಪುಸ್ತಕ: {totalQuantity}</Typography>
                                <Typography sx={{ marginLeft: 33 }}>
                                    ಒಟ್ಟು ಖರೀದಿ ಬೆಲೆ: ₹ {totalAmount}
                                </Typography>
                                <IconButton size="small" onClick={handleAmountOpen} title="Total = (Book Price x Quantity) + Tax">
                                    <InfoIcon />
                                </IconButton>
                            </Box>
                            <Dialog open={openAmountDialog} onClose={handleAmountClose}>
                                <DialogTitle sx={{ fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    ಖರೀದಿ ಮಾಹಿತಿ
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleAmountClose}
                                        sx={{
                                            position: "absolute",
                                            right: 8,
                                            top: 8,
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent>
                                    <Box display="flex" justifyContent="space-between" mb={2} width={500}>
                                        <Typography>ಒಟ್ಟು ಖರೀದಿ ಬೆಲೆ</Typography>
                                        <Typography>{totalAmount}</Typography>
                                    </Box>

                                    <Box display="flex" justifyContent="space-between" mb={2}>
                                        <Typography>ಇತರ ಬೆಲೆ</Typography>
                                        <Typography>{extraPrice}</Typography>
                                    </Box>

                                    <Box display="flex" justifyContent="space-between" mb={2}>
                                        <Typography>ತೆರಿಗೆ SGST</Typography>
                                        <Typography>- ₹ 30</Typography>
                                    </Box>

                                    <Box display="flex" justifyContent="space-between" mb={2}>
                                        <Typography>ತೆರಿಗೆ CGST</Typography>
                                        <Typography>- ₹ 30</Typography>
                                    </Box>

                                    <Box display="flex" justifyContent="space-between" mt={2}>
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು ಮೊತ್ತ
                                        </Typography>
                                        <Typography sx={{ fontWeight: "bold" }}>₹ {totalWithExtra}</Typography>
                                    </Box>
                                </DialogContent>


                            </Dialog>


                        </Box>

                    </Box>
                </Box>

                <Box
                    sx={{
                        bgcolor: "white",
                        p: 1.5,
                        borderRadius: 1,
                        boxShadow: 1,
                        mb: 3,
                        position: "relative",
                    }}
                >



                    {/* IDs */}
                    <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
                        <FormControl style={{ width: "25%", marginRight: 20 }} >
                            <TextField
                                select
                                label="ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                                style={{ width: "100%", marginRight: 20 }}
                            >
                                <MenuItem value="ನಗದು">ನಗದು</MenuItem>
                                <MenuItem value="Cheque">Cheque</MenuItem>
                                <MenuItem value="DD">DD</MenuItem>
                            </TextField>

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
                        <TextField label="ರಶೀದಿ ಸಂಖ್ಯೆ " value={otherId} onChange={(e) => setOtherId(e.target.value)} style={{ width: 330, marginRight: 20 }} />
                        <TextField label="ಹಣವನ್ನು ಸ್ವೀಕರಿಸಲಾಗುತ್ತಿದೆ " value={amountReceived} onChange={(e) => setAmountReceived(e.target.value)} style={{ width: 330, marginRight: 20 }} />
                        <Button
                            variant="contained"
                            color="white"
                            onClick={() =>
                                setExtraFields([
                                    ...extraFields,
                                    { place: "", chequeNumber: "", aadhar: "", pan: "", otherId: "", amountReceived: "" },
                                ])
                            }
                            sx={{
                                minWidth: 0,
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                            }}
                        >
                            +
                        </Button>

                    </div>
                    <hr style={{ width: "100%", marginTop: "2%", color: "#222B45" }} />


                    {extraFields.map((field, index) => (
                        <div key={index}>
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    flexWrap: "nowrap",
                                    alignItems: "center",
                                    gap: 16,
                                    overflowX: "auto",
                                    paddingTop: 20,
                                    paddingBottom: 8,
                                }}
                            >
                                <FormControl style={{ width: 270 }}>
                                    <TextField label="ಹಣ ಸ್ವೀಕರಿಸುವ ಪ್ರಕಾರ"
                                        select
                                        value={field.place}
                                        onChange={(e) => {
                                            const newFields = [...extraFields];
                                            newFields[index].place = e.target.value;
                                            setExtraFields(newFields);
                                        }}
                                    >
                                        <MenuItem value="ನಗದು">ನಗದು</MenuItem>
                                        <MenuItem value="Cheque">Cheque</MenuItem>
                                        <MenuItem value="DD">DD</MenuItem>
                                    </TextField>
                                </FormControl>

                                {(field.place === "Cheque" || field.place === "DD") && (
                                    <TextField
                                        label={field.place === "Cheque" ? "Cheque ಸಂಖ್ಯೆ" : "DD ಸಂಖ್ಯೆ"}
                                        value={field.chequeNumber}
                                        onChange={(e) => {
                                            const newFields = [...extraFields];
                                            newFields[index].chequeNumber = e.target.value;
                                            setExtraFields(newFields);
                                        }}
                                        style={{ width: 250 }}
                                    />
                                )}

                                <TextField
                                    label="AADHAR NO"
                                    value={field.aadhar}
                                    onChange={(e) => {
                                        const newFields = [...extraFields];
                                        newFields[index].aadhar = e.target.value;
                                        setExtraFields(newFields);
                                    }}
                                    style={{ width: 275 }}
                                />

                                <TextField
                                    label="PAN NO"
                                    value={field.pan}
                                    onChange={(e) => {
                                        const newFields = [...extraFields];
                                        newFields[index].pan = e.target.value;
                                        setExtraFields(newFields);
                                    }}
                                    style={{ width: 270 }}
                                />

                                <TextField
                                    label="ರಶೀದಿ ಸಂಖ್ಯೆ"
                                    value={field.otherId}
                                    onChange={(e) => {
                                        const newFields = [...extraFields];
                                        newFields[index].otherId = e.target.value;
                                        setExtraFields(newFields);
                                    }}
                                    style={{ width: 270 }}
                                />
                                <TextField
                                    label="ಹಣವನ್ನು ಸ್ವೀಕರಿಸಲಾಗುತ್ತಿದೆ"
                                    value={field.amountReceived}
                                    onChange={(e) => {
                                        const newFields = [...extraFields];
                                        newFields[index].amountReceived = e.target.value;
                                        setExtraFields(newFields);
                                    }}
                                    style={{ width: 270 }}
                                />

                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                        const newFields = extraFields.filter((_, i) => i !== index);
                                        setExtraFields(newFields);
                                    }}
                                    sx={{ minWidth: 0, p: 1, height: 40 }}
                                >
                                    <DeleteIcon />
                                </Button>

                            </div>
                            <hr style={{ width: "100%", marginTop: "2%", color: "#222B45" }} />
                        </div>

                    ))}

                    {/* Payment & Actions */}

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
                        <IconButton onClick={() => setOpen(true)}>
                            <InfoIcon color="action" />
                        </IconButton>

                        {/* Dialog Box */}
                        <Dialog open={open} onClose={() => setOpen(false)}>
                            <DialogTitle sx={{ fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು ಮೊತ್ತ ಮಾಹಿತಿ
                                <IconButton
                                    aria-label="close"
                                    onClick={() => setOpen(false)}
                                    sx={{
                                        position: "absolute",
                                        right: 8,
                                        top: 8,
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>

                            <DialogContent>
                                <Box display="flex" justifyContent="space-between" mb={2} width={500}>
                                    <Typography>ಒಟ್ಟು ಖರೀದಿ ಬೆಲೆ</Typography>
                                    <Typography>{totalAmount}</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography>ಇತರ ಬೆಲೆ</Typography>
                                    <Typography>{extraPrice}</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography>ತೆರಿಗೆ SGST</Typography>
                                    <Typography>- ₹ 30</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography>ತೆರಿಗೆ CGST</Typography>
                                    <Typography>- ₹ 30</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <Typography>
                                        ರಿಯಾಯಿತಿ ಮೊತ್ತ
                                    </Typography>
                                    <Typography > - ₹ {paymentAmount || 0}</Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        ಪಾವತಿಸಬೇಕಾದ ಒಟ್ಟು ಮೊತ್ತ

                                    </Typography>
                                    <Typography sx={{ fontWeight: "bold" }}>₹  {totalWithExtra - (paymentAmount || 0)}</Typography>
                                </Box>
                            </DialogContent>


                        </Dialog>
                        <TextField
                            label="ಪಾವತಿಸಲು ಬಾಕಿ ಇರುವ ಮೊತ್ತ"
                            value={remainingAmount}
                            InputProps={{ readOnly: true }}
                            style={{ marginTop: 20 }}
                        />

                        <Typography>ಸ್ವೀಕರಿಸುತ್ತಿರುವ ಮೊತ್ತ ₹</Typography>

                        <div>
                            <input
                                type="number"
                                value={receivedAmount}
                                onChange={(e) => setReceivedAmount(e.target.value)}
                                style={{
                                    border: "none",
                                    outline: "none",
                                    fontSize: "18px",
                                    width: "150px",
                                    color: "green",
                                    fontWeight: "bold",
                                    textSizeAdjust: "auto",
                                }}
                            />
                        </div>



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
                                    const payload = {
                                        mobile: mobileNumber,
                                        name: name,
                                        date: date,
                                        paymentMethod: paymentMethod,
                                        discountType: paymentMethod,
                                        discountAmount: paymentAmount,
                                        totalAmount: totalWithExtra,
                                        finalPayable: finalPayable,
                                        receiptNumber: otherId,
                                        mode: place,
                                        chequeNumber: chequeNumber,
                                        aadhar: aadhar,
                                        pan: pan,
                                        items: rows,
                                    };

                                    fetch("http://localhost:5000/api/sales", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(payload),
                                    })
                                        .then((res) => res.json())
                                        .then((data) => {
                                            console.log("✅ Sale saved:", data);
                                            navigate("/Booklist");
                                        })
                                        .catch((err) => console.error("❌ Error saving sale:", err));

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
        </>
    );
}