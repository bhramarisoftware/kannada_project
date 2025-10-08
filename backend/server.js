// backend/server.js
import express from "express";
import cors from "cors";
import db from "./db.js"; // MySQL connection

const app = express();
app.use(cors());
app.use(express.json());

// -------- Root route --------
app.get("/", (req, res) => {
  res.send("✅ API is running... use /api/members, /api/donations, /api/books");
});

// -------- Members API (using MySQL) --------

// GET all members
app.get("/api/members", (req, res) => {
  const query = "SELECT * FROM members";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST a new member
app.post("/api/members", (req, res) => {
  const { membershipType, status, formData, entries } = req.body;

  const query = `
    INSERT INTO members 
    (membershipType, status, mobile, name, nickname, altMobile, email, dob, pan, aadhaar, address, date, endDate, entries)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      membershipType,
      status,
      formData.mobile,
      formData.name,
      formData.nickname,
      formData.altMobile,
      formData.email,
      formData.dob,
      formData.pan,
      formData.aadhaar,
      formData.address,
      formData.date,
      formData.endDate,
      JSON.stringify(entries)
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ member: { id: result.insertId, ...req.body } });
    }
  );
});

// DELETE a member by id
app.delete("/api/members/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM members WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Member deleted" });
  });
});






// -------- Books API (in-memory) --------
let books = [];

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).json({ message: "Book added", book });
});

// -------- Start server --------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
// -------- Donations API (MySQL) --------

// // Get all donations
// app.get("/api/donations", (req, res) => {
//   const query = `
//     SELECT 
//       d.*, 
//       e.id AS entryId, 
//       e.fund, 
//       e.fundDetails, 
//       e.payment, 
//       e.receiptNumber, 
//       e.depositDetails
//     FROM donations d
//     LEFT JOIN donation_entries e 
//     ON d.id = e.donation_id
//     ORDER BY d.id DESC
//   `;

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching donations:", err);
//       return res.status(500).json({ error: err.message });
//     }

//     // ✅ Group entries by donation id
//     const donations = {};
//     results.forEach((row) => {
//       if (!donations[row.id]) {
//         donations[row.id] = {
//           id: row.id,
//           mobile: row.mobile,
//           name: row.name,
//           nickname: row.nickname,
//           altMobile: row.altMobile,
//           email: row.email,
//           dob: row.dob,
//           pan: row.pan,
//           aadhaar: row.aadhaar,
//           address: row.address,
//           date: row.date,
//           endDate: row.endDate,
//           entries: [],
//         };
//       }

//       if (row.entryId) {
//         donations[row.id].entries.push({
//           id: row.entryId,
//           fund: row.fund,
//           fundDetails: row.fundDetails,
//           payment: row.payment,
//           receiptNumber: row.receiptNumber,
//           depositDetails: row.depositDetails,
//         });
//       }
//     });

//     res.json(Object.values(donations));
//   });
// });





// // Add a donation
// app.post("/api/donations", (req, res) => {
//   const { formData, entries } = req.body;

//   if (!formData) {
//     return res.status(400).json({ error: "Missing formData" });
//   }

//   // Insert into donations table
//   const donationQuery = `
//     INSERT INTO donations 
//     (mobile, name, nickname, altMobile, email, dob, pan, aadhaar, address, date, endDate)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const donationValues = [
//     formData.mobile,
//     formData.name,
//     formData.nickname,
//     formData.altMobile,
//     formData.email,
//     formData.dob,
//     formData.pan,
//     formData.aadhaar,
//     formData.address,
//     formData.date,
//     formData.endDate,
//   ];

//   db.query(donationQuery, donationValues, (err, result) => {
//     if (err) {
//       console.error("❌ Error inserting donation:", err);
//       return res.status(500).json({ error: err.message });
//     }

//     const donationId = result.insertId;

//     // Insert entries if any
//     if (entries && entries.length > 0) {
//       const entryQuery = `
//         INSERT INTO donation_entries 
//         (donation_id, fund, fundDetails, payment, receiptNumber, depositDetails)
//         VALUES ?
//       `;

//       const entryValues = entries.map((e) => [
//         donationId,
//         e.fund || "",
//         e.fundDetails || "",
//         e.payment || "",
//         e.receiptNumber || "",
//         e.depositDetails || "",
//       ]);

//       db.query(entryQuery, [entryValues], (entryErr) => {
//         if (entryErr) {
//           console.error("❌ Error inserting donation entries:", entryErr);
//           return res.status(500).json({ error: entryErr.message });
//         }

//         console.log("✅ Donation & entries added successfully!");
//         res.status(201).json({ message: "Donation added", donationId });
//       });
//     } else {
//       res.status(201).json({ message: "Donation added (no entries)", donationId });
//     }
//   });
// });



// -------- Sales API (MySQL) --------






app.post("/api/sales", (req, res) => {
  const {
    mobile,
    name,
    date,
    paymentMethod,
    discountType,
    discountAmount,
    totalAmount,
    finalPayable,
    receiptNumber,
    mode,
    chequeNumber,
    aadhar,
    pan,
    items
  } = req.body;

  if (!date) return res.status(400).json({ error: "Date is required" });

  const insertSaleQuery = `
    INSERT INTO sales (
      mobile, name, date, paymentMethod, discountType,
      discountAmount, totalAmount, finalPayable, receiptNumber,
      mode, chequeNumber, aadhar, pan
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const saleValues = [
    mobile, name, date, paymentMethod, discountType,
    discountAmount, totalAmount, finalPayable, receiptNumber,
    mode, chequeNumber, aadhar, pan
  ];

  db.query(insertSaleQuery, saleValues, (err, saleResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const saleId = saleResult.insertId;

    const itemPromises = (items || []).map(item => {
      return new Promise((resolve, reject) => {
        const insertItemQuery = `
          INSERT INTO sale_items (sale_id, productName, price, quantity, tax, total)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        const itemValues = [
          saleId,
          item.productName,
          item.price,
          item.quantity,
          item.tax,
          item.total
        ];
        db.query(insertItemQuery, itemValues, (itemErr) => {
          if (itemErr) reject(itemErr);
          else resolve();
        });
      });
    });

    Promise.all(itemPromises)
      .then(() => {
        // Fetch full sale with items
        const query = `
          SELECT s.*, i.id AS itemId, i.productName, i.price, i.quantity, i.tax, i.total
          FROM sales s
          LEFT JOIN sale_items i ON s.id = i.sale_id
          WHERE s.id = ?
        `;
        db.query(query, [saleId], (fetchErr, rows) => {
          if (fetchErr) return res.status(500).json({ error: fetchErr.message });

          if (!rows.length) return res.status(404).json({ error: "Sale not found" });

          const sale = {
            id: rows[0].id,
            mobile: rows[0].mobile,
            name: rows[0].name,
            date: rows[0].date,
            paymentMethod: rows[0].paymentMethod,
            discountType: rows[0].discountType,
            discountAmount: rows[0].discountAmount,
            totalAmount: rows[0].totalAmount,
            finalPayable: rows[0].finalPayable,
            receiptNumber: rows[0].receiptNumber,
            mode: rows[0].mode,
            chequeNumber: rows[0].chequeNumber,
            aadhar: rows[0].aadhar,
            pan: rows[0].pan,
            items: []
          };

          rows.forEach(r => {
            if (r.itemId) {
              sale.items.push({
                id: r.itemId,
                productName: r.productName,
                price: r.price,
                quantity: r.quantity,
                tax: r.tax,
                total: r.total
              });
            }
          });

          res.status(201).json(sale);
        });
      })
      .catch(itemErr => res.status(500).json({ error: itemErr.message }));
  });
});

// -------- GET /api/sales --------
app.get("/api/sales", (req, res) => {
  const query = `
    SELECT 
      s.id, s.mobile, s.name, s.date, s.paymentMethod, s.discountType,
      s.discountAmount, s.totalAmount, s.finalPayable, s.receiptNumber,
      s.mode, s.chequeNumber, s.aadhar, s.pan,
      i.id AS itemId, i.productName, i.price, i.quantity, i.tax, i.total
    FROM sales s
    LEFT JOIN sale_items i ON s.id = i.sale_id
    ORDER BY s.id DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const salesMap = {};
    results.forEach(row => {
      if (!salesMap[row.id]) {
        salesMap[row.id] = {
          id: row.id,
          mobile: row.mobile,
          name: row.name,
          date: row.date,
          paymentMethod: row.paymentMethod,
          discountType: row.discountType,
          discountAmount: row.discountAmount,
          totalAmount: row.totalAmount,
          finalPayable: row.finalPayable,
          receiptNumber: row.receiptNumber,
          mode: row.mode,
          chequeNumber: row.chequeNumber,
          aadhar: row.aadhar,
          pan: row.pan,
          items: []
        };
      }

      if (row.itemId) {
        salesMap[row.id].items.push({
          id: row.itemId,
          productName: row.productName,
          price: row.price,
          quantity: row.quantity,
          tax: row.tax,
          total: row.total
        });
      }
    });

    res.json(Object.values(salesMap));
  });
});
// Delete a sale by ID
app.delete("/api/sales/:id", (req, res) => {
  const saleId = req.params.id;

  const query = "DELETE FROM sales WHERE id = ?"; // Replace 'sales' with your table name

  db.query(query, [saleId], (err, result) => {
    if (err) {
      console.error("Error deleting sale:", err);
      return res.status(500).json({ message: "Failed to delete sale" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sale not found" });
    }

    res.json({ message: "Sale deleted successfully" });
  });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





