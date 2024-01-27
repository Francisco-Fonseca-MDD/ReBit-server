require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

async function getReviews(id, res, cursor) {
  try {
    const { data } = await axios.get(
      `http://store.steampowered.com/appreviews/${id}?json=1&filter=recent`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const cursor = req.body.cursor;
  getReviews(id, res);
});

app.listen(
  process.env.PORT,
  console.log(`Server has been started with port:${process.env.PORT}`)
);
