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

// Get all donations
app.get("/api/donations", (req, res) => {
  const query = `
    SELECT 
      d.*, 
      e.id AS entryId, 
      e.fund, 
      e.fundDetails, 
      e.payment, 
      e.receiptNumber, 
      e.depositDetails
    FROM donations d
    LEFT JOIN donation_entries e 
    ON d.id = e.donation_id
    ORDER BY d.id DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching donations:", err);
      return res.status(500).json({ error: err.message });
    }

    // ✅ Group entries by donation id
    const donations = {};
    results.forEach((row) => {
      if (!donations[row.id]) {
        donations[row.id] = {
          id: row.id,
          mobile: row.mobile,
          name: row.name,
          nickname: row.nickname,
          altMobile: row.altMobile,
          email: row.email,
          dob: row.dob,
          pan: row.pan,
          aadhaar: row.aadhaar,
          address: row.address,
          date: row.date,
          endDate: row.endDate,
          entries: [],
        };
      }

      if (row.entryId) {
        donations[row.id].entries.push({
          id: row.entryId,
          fund: row.fund,
          fundDetails: row.fundDetails,
          payment: row.payment,
          receiptNumber: row.receiptNumber,
          depositDetails: row.depositDetails,
        });
      }
    });

    res.json(Object.values(donations));
  });
});





// Add a donation
app.post("/api/donations", (req, res) => {
  const { formData, entries } = req.body;

  if (!formData) {
    return res.status(400).json({ error: "Missing formData" });
  }

  // Insert into donations table
  const donationQuery = `
    INSERT INTO donations 
    (mobile, name, nickname, altMobile, email, dob, pan, aadhaar, address, date, endDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const donationValues = [
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
  ];

  db.query(donationQuery, donationValues, (err, result) => {
    if (err) {
      console.error("❌ Error inserting donation:", err);
      return res.status(500).json({ error: err.message });
    }

    const donationId = result.insertId;

    // Insert entries if any
    if (entries && entries.length > 0) {
      const entryQuery = `
        INSERT INTO donation_entries 
        (donation_id, fund, fundDetails, payment, receiptNumber, depositDetails)
        VALUES ?
      `;

      const entryValues = entries.map((e) => [
        donationId,
        e.fund || "",
        e.fundDetails || "",
        e.payment || "",
        e.receiptNumber || "",
        e.depositDetails || "",
      ]);

      db.query(entryQuery, [entryValues], (entryErr) => {
        if (entryErr) {
          console.error("❌ Error inserting donation entries:", entryErr);
          return res.status(500).json({ error: entryErr.message });
        }

        console.log("✅ Donation & entries added successfully!");
        res.status(201).json({ message: "Donation added", donationId });
      });
    } else {
      res.status(201).json({ message: "Donation added (no entries)", donationId });
    }
  });
});



