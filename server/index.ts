const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const ExerciseRoutes = require("./routes/api/exerciseList.ts");
require("dotenv").config();

app.use(cors()); // to allow cross origin requests
app.use(bodyParser.json()); // to convert the request into JSON

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err: any) => console.log(err));

app.use("/api/exerciseList", ExerciseRoutes);

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);
