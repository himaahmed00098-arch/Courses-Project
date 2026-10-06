require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const mongoose = require("mongoose");
const httpStatusText = require("./utils/httpStatusText");
const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("mongodb server started");
});
app.use(cors());
// ** لازم اكتب السطر ده
app.use(express.json());
const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");

app.use("/api/Courses", coursesRouter); // ** localhost/ =>  /api/Courses

app.use("/api/users", usersRouter); // ** /api/users

// ** global middleware for not found router
app.all("{*split}", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource is not available",
  });
});

// ** global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log("listening on port: 5000");
});
