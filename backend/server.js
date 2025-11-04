// backend/server.js
import express from "express";
import cors from "cors";
import db from "./db.js"; // MySQL connection

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(" API is running... use /api/members, /api/donations, /api/books");
});



// ✅ Generate next member number (continuous across LM & OM)
app.get("/api/next-member-number/:type", async (req, res) => {
  try {
    const membershipType = req.params.type; // "ಆಜೀವ" or "ವಾರ್ಷಿಕ"

    // ✅ Prefix based on membership type
    let prefix = "";
    if (membershipType === "ಆಜೀವ") {
      prefix = "LM";
    } else if (membershipType === "ವಾರ್ಷಿಕ") {
      prefix = "OM";
    } else {
      return res.status(400).json({ error: "Invalid membership type" });
    }

    // ✅ Get last member number from ANY prefix
    const [rows] = await db
      .promise()
      .query(
        "SELECT memberNumber FROM members ORDER BY CAST(SUBSTRING(memberNumber, 3) AS UNSIGNED) DESC LIMIT 1"
      );

    let nextNumber = prefix + "001"; // default when table is empty

    if (rows.length > 0) {
      const lastNumber = parseInt(rows[0].memberNumber.slice(2), 10) || 0;
      const nextNum = lastNumber + 1;
      nextNumber = prefix + String(nextNum).padStart(3, "0");
    }

    res.json({ nextNumber });
  } catch (error) {
    console.error("❌ Error generating member number:", error);
    res.status(500).json({ error: "Failed to generate member number" });
  }
});


// ✅ Add a new member (uses shared numbering)
app.post("/api/members", async (req, res) => {
  try {
    const { membershipType, status, formData, entries } = req.body;

    // ✅ Determine prefix
    let prefix = "";
    if (membershipType === "ಆಜೀವ") {
      prefix = "LM";
    } else if (membershipType === "ವಾರ್ಷಿಕ") {
      prefix = "OM";
    } else {
      return res.status(400).json({ error: "Invalid membership type" });
    }

    // ✅ Get last number regardless of prefix
    const [rows] = await db
      .promise()
      .query(
        "SELECT memberNumber FROM members ORDER BY CAST(SUBSTRING(memberNumber, 3) AS UNSIGNED) DESC LIMIT 1"
      );

    let nextNumber = prefix + "001"; // reset if DB empty
    if (rows.length > 0) {
      const lastNumber = parseInt(rows[0].memberNumber.slice(2), 10) || 0;
      const nextNum = lastNumber + 1;
      nextNumber = prefix + String(nextNum).padStart(3, "0");
    }

    // ✅ Insert into DB
    await db.promise().query(
      `INSERT INTO members 
        (memberNumber, membershipType, status, mobile, name, nickname, altMobile, email, dob, pan, aadhaar, address, date, endDate, entries)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nextNumber,
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
        JSON.stringify(entries),
      ]
    );

    res.status(201).json({ success: true, memberNumber: nextNumber });
  } catch (error) {
    console.error("❌ Error adding member:", error);
    res.status(500).json({ error: "Error adding member" });
  }
});


// ✅ Fetch all members
app.get("/api/members", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM members ORDER BY id ASC");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching members:", error);
    res.status(500).json({ error: "Error fetching members" });
  }
});


// ✅ Delete member by memberNumber
app.delete("/api/members/:memberNumber", async (req, res) => {
  try {
    const memberNumber = req.params.memberNumber;
    const [result] = await db
      .promise()
      .query("DELETE FROM members WHERE memberNumber = ?", [memberNumber]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json({
      success: true,
      message: `Member ${memberNumber} deleted successfully`,
    });
  } catch (error) {
    console.error("❌ Error deleting member:", error);
    res.status(500).json({ error: "Failed to delete member" });
  }
});


app.get("/api/members/:memberNumber", async (req, res) => {
  const { memberNumber } = req.params;

  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM members WHERE memberNumber = ?", [memberNumber]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Parse JSON if necessary
    const member = rows[0];
    if (member.entries && typeof member.entries === "string") {
      try {
        member.entries = JSON.parse(member.entries);
      } catch {
        member.entries = [];
      }
    }

    res.json(member);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ message: "Server error" });
  }
});


 







// Donations API 

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
      e.paymentType
    FROM donations d
    LEFT JOIN donation_entries e 
    ON d.id = e.donation_id
    ORDER BY d.id DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(" Error fetching donations:", err);
      return res.status(500).json({ error: err.message });
    }

    // ✅ Group entries by donation id
    const donations = {};
    results.forEach((row) => {
      if (!donations[row.id]) {
        donations[row.id] = {
          id: row.id,
          mobile: row.mobile,
          donorName: row.donorName,
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
          paymentType: row.paymentType,
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
    (mobile, donorName, nickname, altMobile, email, dob, pan, aadhaar, address, date, endDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const donationValues = [
    formData.mobile,
    formData.donorName,
    formData.nickname,
    formData.altMobile,
    formData.email,
    formData.dob || null,
    formData.pan,
    formData.aadhaar,
    formData.address,
    formData.date,
    formData.endDate || null,
  ];

  db.query(donationQuery, donationValues, (err, result) => {
    if (err) {
      console.error(" Error inserting donation:", err);
      return res.status(500).json({ error: err.message });
    }

    const donationId = result.insertId;

    // Insert entries if any
    if (entries && entries.length > 0) {
      const entryQuery = `
        INSERT INTO donation_entries 
        (donation_id, fund, fundDetails, payment, receiptNumber, paymentType)
        VALUES ?
      `;

      const entryValues = entries.map((e) => [
        donationId,
        e.fund || "",
        e.fundDetails || "",
        e.payment || "",
        e.receipt || "",
        e.paymentType || "",
      ]);

      db.query(entryQuery, [entryValues], (entryErr) => {
        if (entryErr) {
          console.error(" Error inserting donation entries:", entryErr);
          return res.status(500).json({ error: entryErr.message });
        }

        console.log(" Donation & entries added successfully!");
        res.status(201).json({ message: "Donation added", donationId });
      });
    } else {
      res.status(201).json({ message: "Donation added (no entries)", donationId });
    }
  });
});

// DELETE a donation by id
app.delete("/api/donations/:id", (req, res) => {
  const { id } = req.params;
 
  // Delete donation 
  const deleteEntriesQuery = "DELETE FROM donation_entries WHERE donation_id = ?";
  db.query(deleteEntriesQuery, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
 
    // Then delete the donation itself
    const deleteDonationQuery = "DELETE FROM donations WHERE id = ?";
    db.query(deleteDonationQuery, [id], (err2, result) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ message: "Donation deleted successfully" });
    });
  });
});




// Sales API  
 
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
 


//GET /api/sales 
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
 
//  DELETE 
app.delete("/api/sales/:id", (req, res) => {
  const { id } = req.params;
 
  const query = "DELETE FROM sales WHERE id = ?";
 
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
 
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Sale not found" });
 
    res.json({ message: "Sale deleted successfully" });
  });
});


 
// GET all expense categories
app.get("/api/expense-categories", (req, res) => {
  const query = "SELECT * FROM expense_categories ORDER BY id ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
 
// POST a new expense category
app.post("/api/expense-categories", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
 
  const query = "INSERT INTO expense_categories (name) VALUES (?)";
  db.query(query, [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
 
    res.status(201).json({
      id: result.insertId,
      name,
    });
  });
});
 
// DELETE an expense category
app.delete("/api/expense-categories/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM expense_categories WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Expense category deleted" });
  });
});





// GET all treasures
app.get("/api/treasures", (req, res) => {
  const query = "SELECT * FROM treasures ORDER BY id ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
 
// POST a new expense category
app.post("/api/treasures", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const query = "INSERT INTO treasures (name) VALUES (?)";
  db.query(query, [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
 
    res.status(201).json({
      id: result.insertId,
      name,
    });
  });
});
 
// DELETE an expense category
app.delete("/api/treasures/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM treasures WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Treasure deleted" });
  });
});






// GET all booksales-types
app.get("/api/booksales-types", (req, res) => {
  const query = "SELECT * FROM booksales_types ORDER BY id ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
 
// POST a new expense category
app.post("/api/booksales-types", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const query = "INSERT INTO booksales_types (name) VALUES (?)";
  db.query(query, [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
 
    res.status(201).json({
      id: result.insertId,
      name,
    });
  });
});
 
// DELETE an expense category
app.delete("/api/booksales-types/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM booksales_types WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Book sales type deleted" });
  });
});







// GET all storemanagers
app.get("/api/storemanagers", (req, res) => {
  const query = "SELECT * FROM storemanagers ORDER BY id ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
 
// POST a new store manager
app.post("/api/storemanagers", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const query = "INSERT INTO storemanagers (name) VALUES (?)";
  db.query(query, [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
 
    res.status(201).json({
      id: result.insertId,
      name,
    });
  });
});
 
// DELETE an expense category
app.delete("/api/storemanagers/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM storemanagers WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Store manager deleted" });
  });
});




// GET all salestype
app.get("/api/salestype", (req, res) => {
  const query = "SELECT * FROM salestype16 ORDER BY id ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//  POST (Save)
app.post("/api/salestype", (req, res) => {
  console.log("REQ BODY:", req.body);
  const { name, price, tax } = req.body;

  if (!name || !price || !tax) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = "INSERT INTO salestype16 (name, price, tax) VALUES (?, ?, ?)";
  db.query(query, [name, price, tax], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      id: result.insertId,
      name,
      price,
      tax,
    });
  });
});

// DELETE
app.delete("/api/salestype/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM salestype16 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Sales type deleted" });
  });
});





const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


// CREATE TABLE salestype16 (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   price DECIMAL(10, 2) NOT NULL,
//   tax DECIMAL(5, 2) NOT NULL
// );
  


