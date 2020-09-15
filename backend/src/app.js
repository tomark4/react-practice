const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
dotenv.config();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    const todoRoutes = require("./routes/todo.routes");
    const userRoutes = require("./routes/user.routes");
    app.use("/uploads", express.static(__dirname + "/uploads"));
    app.use("/api/todos/", todoRoutes);
    app.use("/api/users/", userRoutes);

    app.listen(process.env.APP_PORT, () =>
      console.log("Express is running on port:  " + process.env.APP_PORT)
    );
  })
  .catch((err) => {
    console.log(`Error de database ${err}`);
  });
