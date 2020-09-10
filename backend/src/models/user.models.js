const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: String,
    email: { type: String, unique: true, index: true, required: true },
    password: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};
module.exports = mongoose.model("User", userSchema);
