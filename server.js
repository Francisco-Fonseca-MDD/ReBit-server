require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const gamesRoutes = require("./routes/games");
const reviewsRoutes = require("./routes/reviews");
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/games", gamesRoutes);
app.use("/reviews", reviewsRoutes);

app.listen(
  port,
  console.log(`Server has been started with port:${process.env.PORT}`)
);
