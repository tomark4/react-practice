const User = require("../models/user.models");

// TODO: validate fields register and login

const controller = {
  register: async (req, res) => {
    // create new user
    try {
      const { name, email, password } = req.body;
      const user = new User();
      user.name = name;
      user.email = email;
      // TODO: password encrypt
      user.password = password;
      user.avatar = null;
      const userStore = await user.save();

      if (!userStore) {
        res.status(422).send({ ok: false, message: "user not created" });
      }
      res.send({ ok: true, message: "user register succesfully", userStore });
    } catch (err) {
      res.send({ ok: false, message: "error", err });
    }
  },
  login: async (req, res) => {
    // login user
    try {
      const { email, password } = req.body;
      user = await User.findOne({ email: email });
      if (!user) {
        res
          .status(422)
          .send({ ok: false, message: "user or password invalid" });
      }
      // TODO: validar password
      // TODO: generar token
      res.send({ ok: true, message: "success", user });
    } catch (err) {
      res.send({ ok: false, message: "error", err });
    }
  },
  uploadAvatar: (req, res) => {
    // TODO: upload avatar
  },
  getAvatar: () => {
    // TODO: return avatar user
  },
  generateToken: (payload) => {
    // TODO: generate token
  },
};

module.exports = controller;
