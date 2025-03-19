const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieparser = require("cookie-parser");
const userRoute = require("./routes/LoginRoutes");
const EmployeRoute = require("./controllers/EmployeeController");

const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use("/api", userRoute);
app.use("/api", EmployeRoute);

app.listen(PORT, () => {
  console.log(`Server will be worked on http://localhost:${PORT}`);
});
