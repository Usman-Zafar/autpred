const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 5000;
const routes = require("./routes/index");
//const path = require("path");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use((req, res, next) => {
  next();
  console.log(`${req.url} ${res.statusCode}`);
});
app.use(routes);

const connectDB = require("./db/connect");
connectDB();
app.listen(port, () => {
  console.log(`Server is listening on Port:${port}..`);
});
