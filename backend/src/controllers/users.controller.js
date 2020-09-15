import User from "../models/user.models";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

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
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;

      const schema = Joi.object({
        name: Joi.string().required(),
      });

      const { error } = schema.validate({ name });

      if (error) {
        return res.status(400).json({ ok: false, message: error.message });
      }

      const user = await User.findOneAndUpdate(
        { _id: id },
        { name: req.body.name },
        { new: true }
      ).exec();

      if (user) {
        return res.json({
          ok: true,
          message: "success",
          user,
          token: generateToken(user),
        });
      }
    } catch (err) {
      return res.status(500).json({ ok: false, err, message: "error" });
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res
          .status(400)
          .send({ ok: false, message: "No files were uploaded" });
      }

      const avatar = req.files.avatar;
      let ext = avatar.name.split(".")[1];
      const nombreImg = Date.now() + "." + ext;

      const user = await User.findById(req.user.uid).exec();

      if (!user) {
        return res.status(400).send({ ok: false, message: "User not found" });
      }

      const directory = path.resolve(__dirname, `../uploads/${req.user.uid}`);

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      const currentImage = `${directory}/${user.avatar}`;

      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      avatar.mv(`${directory}/${nombreImg}`, async (err) => {
        if (err) return res.status(500).send({ ok: false, message: err });
        const userUpdated = await User.findByIdAndUpdate(
          { _id: req.user.uid },
          {
            avatar: nombreImg,
          },
          { new: true }
        ).exec();

        if (!userUpdated) {
          return res
            .status(500)
            .send({ ok: false, message: "Error al actualizar" });
        }

        res.send({
          ok: true,
          message: "File uploaded!",
          user: userUpdated,
          token: generateToken(userUpdated),
        });
      });
    } catch (err) {
      return res.status(400).send({ ok: false, message: "error", err });
    }
  },
  getAvatar: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.user.uid }).exec();

      if (!user) {
        return res.status(400).send({ ok: false, message: "user not found" });
      }

      const avatar = path.resolve(
        __dirname,
        `../uploads/${user._id}/${user.avatar}`
      );

      if (!fs.existsSync(avatar)) {
        return res.status(400).send({ ok: false, message: "Image not found" });
      }

      return res.sendFile(avatar);
    } catch (err) {
      return res.status(500).send({ ok: false, message: "error", err });
    }
  },
};

function generateToken(payload) {
  const { _id, name, email, avatar } = payload;
  return jwt.sign({ uid: _id, name, email, avatar }, process.env.JWT_SECRET);
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
