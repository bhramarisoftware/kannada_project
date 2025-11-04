import mysql from "mysql2";

// Create connection
const db = mysql.createConnection({
  host: "localhost",      // your MySQL host
  user: "root",           // MySQL username
  password: "Mallik$01", // replace with your root password
  database: "kannada_project"     // your database
});

// Test connection
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

export default db;
