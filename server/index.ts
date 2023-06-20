const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const ExerciseRoutes = require("./routes/api/exerciseList.ts");
require("dotenv").config();

app.use(cors()); // to allow cross origin requests
app.use(bodyParser.json({ limit: "50mb" })); // to convert the request into JSON and set max file size to 50mb
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err: any) => console.log(err));

console.log("Test");

console.log(
  `The file size limit is ${app.get("json limit")} for JSON and ${app.get(
    "urlencoded limit"
  )} for URL-encoded data.`
);
app.use("/api/exerciseList", ExerciseRoutes);

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);
