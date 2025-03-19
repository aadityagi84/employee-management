const express = require("express");
const {
  handleRegister,
  handleLogin,
} = require("../controllers/UserController");
const { checkRegister, checkLogin } = require("../helpers/AuthHelpers");
const route = express.Router();

route.post("/register", checkRegister, handleRegister);
route.post("/login", checkLogin, handleLogin);

module.exports = route;
