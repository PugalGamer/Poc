const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes.js");
const cors=require('cors')

app.use(express.json())
app.use(cors(
  {
    methods:["GET","POST","PUT","DELETE"]
  }
))

app.use("/user", userRouter);

mongoose
  .connect("mongodb://localhost:27017/Task")
  .then(() => {
    console.log("database connected");
    app.listen(2000, () => {
      console.log("server is running PORT 2000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("api");
});
