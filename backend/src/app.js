const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

    app.use("/api/todos/", todoRoutes);
    app.use("/api/users/", userRoutes);

    app.listen(process.env.APP_PORT, () =>
      console.log("Express is running on port:  " + process.env.APP_PORT)
    );
  })
  .catch((err) => {
    console.log(`Error de database ${err}`);
  });
