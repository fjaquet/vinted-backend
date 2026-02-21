require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json());

const errorHandler = require("./middlewares/errorHandler");

const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
const offersRoutes = require("./routes/offers");

app.use("/user", userRoutes);
app.use("/offer", offerRoutes);
app.use("/offers", offersRoutes);

app.all(/.*/, (req, res) => {
  return res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server started");
});
