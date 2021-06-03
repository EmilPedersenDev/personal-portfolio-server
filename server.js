require("dotenv").config();
const express = require("express");
const cors = require("cors");

// const corsOptions = {
//   origin: process.env.BASE_URL,
// };

const app = express();
app.use(express.json());
app.use(cors(/* corsOptions */));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Mail server",
  });
});

require("./controller/email-controller.js")(app);

app.listen(port, () => {
  console.log("Server is running on " + port);
});
