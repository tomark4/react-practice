import User from "../models/user.models";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const controller = {
  register: async (req, res) => {
    // create new user
    try {
      const { name, email, password } = req.body;

      const validate = validateRegister({ email, password, name });
      if (validate) {
        return res.status(400).send({ ok: false, message: validate.message });
      }

      const checkIfExists = await User.findOne({ email: email });
      if (checkIfExists) {
        return res
          .status(400)
          .send({ ok: false, message: "Email already exists" });
      }

      const user = new User();

      user.name = name;
      user.email = email;
      user.password = bcrypt.hashSync(password, 10);
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
      const validate = validateFields({ email, password });
      if (validate) {
        return res.status(400).send({ ok: false, message: validate.message });
      }

      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        res
          .status(422)
          .send({ ok: false, message: "email or password wrong 1" });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(400)
          .send({ ok: false, message: "email or password wrong 2" });
      }

      res.send({
        ok: true,
        message: "success",
        user,
        token: generateToken(user),
      });
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
};

function generateToken(payload) {
  const { _id, name, email } = payload;
  return jwt.sign({ uid: _id, name, email }, process.env.JWT_SECRET);
}

function validateFields(data) {
  const schema = Joi.object({
    email: Joi.string().min(3).email().required(),
    password: Joi.string().min(3).required(),
  });

  const { error } = schema.validate({ ...data });

  return error;
}

function validateRegister(data) {
  const schema = Joi.object({
    email: Joi.string().min(3).email().required(),
    password: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate({ ...data });

  return error;
}

module.exports = controller;
