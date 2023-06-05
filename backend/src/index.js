const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");

const route= require("./routes/route");
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://sangamsuman323:XVZrnDNPfS8c21p8@cluster0.bolaw.mongodb.net/mg40Database",
    {
      useNewUrlParser: true,
    }
  )

  .then(() => console.log("MongooDB Connected"))
  .catch((error) => console.log(error));

app.use("/", route);

app.listen(4000, function () {
  console.log("Express app running on Port 4000");
});
