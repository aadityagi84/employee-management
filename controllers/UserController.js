const { validationResult } = require("express-validator");
const { db } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, department, phone, password } = req.body;

    const hassPassword = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO users (name, email, department, phone, password) VALUES (?, ?, ?, ?, ?)`,
      [name, email, department, phone, hassPassword],
      function (err) {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: "Internal server error" });
        }
        return res
          .status(201)
          .json({ message: "User created successfully", userId: this.lastID });
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const handleLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      async (err, user) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ message: "Invalid password" });
        }
        const payload = {
          user: {
            id: user.id,
            name: user.name,
          },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            department: user.department,
            phone: user.phone,
          },
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { handleRegister, handleLogin };
