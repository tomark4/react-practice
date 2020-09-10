const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = Schema(
  {
    title: { type: String, required: true },
    desc: String,
    completed: { type: Boolean, default: false },
    user: { type: Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
