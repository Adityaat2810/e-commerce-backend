const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

app.use(bodyParser.json());
app.use(morgan("tiny"));

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("hello api");
});

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log(`db connection is ready`);
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`server is started on PORT `, PORT);
});
