const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./connection");

const logger = require("./middlewear/logger");

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

const app = express();
const port = 8001;

// DB
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Routes
app.use("/url", urlRoute);
app.use("/user", userRoute);

// Start
app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});