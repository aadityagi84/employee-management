const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "EmployeeManagement.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database: EmployeeManagement.db");

    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        department TEXT NOT NULL,
        phone TEXT NOT NULL,
        password TEXT NOT NULL
      )
      `,
      (createErr) => {
        if (createErr) {
          console.error("Error creating users table:", createErr.message);
        } else {
          console.log("Users table created successfully or already exists.");
        }
      }
    );

    db.run(
      `
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        department TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL
      )
      `,
      (createErr) => {
        if (createErr) {
          console.error("Error creating employees table:", createErr.message);
        } else {
          console.log(
            "Employees table created successfully or already exists."
          );
        }
      }
    );
  }
});

module.exports = { db };
