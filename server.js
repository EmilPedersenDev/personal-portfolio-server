require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: process.env.BASE_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Mail server!",
  });
});

require("./controller/email-controller.js")(app);

app.listen(port, () => {
  console.log("Server is running on " + port);
});
