const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.get("*", (req, res) => {
  res.send({ ok: true, message: "success" });
});

app.listen(process.env.APP_PORT, () =>
  console.log("Express is running on port:  " + process.env.APP_PORT)
);
