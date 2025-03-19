const express = require("express");
const { db } = require("../config/db");
const route = express.Router();

route.get("/employees", (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) {
      console.error("Error fetching employees:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json({ data: rows });
  });
});
//  Retrieve details of a single employee
route.get("/employees/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM employees WHERE id = ?", [id], (err, row) => {
    if (err) {
      console.error("Error fetching employee:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!row) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(row);
  });
});

// Add a new employee
route.post("/employees", (req, res) => {
  const { name, position, department, email, phone } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!position) {
    return res.status(400).json({ error: "Position is required" });
  }
  if (!department) {
    return res.status(400).json({ error: "Department is required" });
  }
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!phone) {
    return res.status(400).json({ error: "Phone is required" });
  }

  const sql = `
    INSERT INTO employees (name, position, department, email, phone)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(sql, [name, position, department, email, phone], function (err) {
    if (err) {
      console.error("Error adding employee:", err.message);
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
    res
      .status(201)
      .json({ id: this.lastID, message: "Employee added successfully" });
  });
});

//  Update an existing employee's details
route.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, position, department, email, phone } = req.body;

  if (!name || !position || !department || !email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    UPDATE employees 
    SET name = ?, position = ?, department = ?, email = ?, phone = ?
    WHERE id = ?
  `;
  db.run(sql, [name, position, department, email, phone, id], function (err) {
    if (err) {
      console.error("Error updating employee:", err.message);
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully" });
  });
});

// Delete an employee
route.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM employees WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Error deleting employee:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  });
});

module.exports = route;
