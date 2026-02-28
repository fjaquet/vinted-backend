require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const generateSwaggerDoc = require("./swagger/swaggerConfig");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(express.json());

const errorHandler = require("./middlewares/errorHandler");

const swaggerDocs = generateSwaggerDoc();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
