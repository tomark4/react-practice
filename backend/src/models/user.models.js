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
  if (this.avatar) {
    obj.avatar_path = `${process.env.APP_URL}/uploads/${this._id}/${this.avatar}`;
  } else {
    obj.avatar_path = "";
  }
  delete obj.password;
  return obj;
};
module.exports = mongoose.model("User", userSchema);
