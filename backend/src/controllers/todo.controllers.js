const Todo = require("../models/todo.models");

const controller = {
  get: async (req, res) => {
    // TODO: todos by user id
    Todo.find({})
      .populate("user")
      .exec()
      .then((todos) => {
        res.send({ ok: true, message: "Success all", todos });
      })
      .catch((err) => {
        res.status(500).send({ ok: false, message: "error", err });
      });
  },
  show: async (req, res) => {
    try {
      const todo = await Todo.findById({ _id: req.params.id });
      if (!todo) {
        return res.status(422).send({ ok: false, message: "todo not found" });
      }
      return res.send({ ok: true, message: "Success show", todo });
    } catch (err) {
      return res.status(500).send({ ok: true, message: "error", err });
    }
  },
  store: (req, res) => {
    const { title, desc } = req.body;
    const todo = new Todo();
    todo.title = title;
    todo.desc = desc;
    // TODO: add user from request
    todo.user = "5f5a7a0ea3b57cde44b468a7";
    todo
      .save()
      .then((todo) => {
        return res.send({ ok: true, message: "todo saved!", todo });
      })
      .catch((err) => {
        return res.status(500).send({ ok: false, message: "error", err });
      });
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, desc } = req.body;

      const todo = await Todo.findByIdAndUpdate(
        { _id: id },
        { title, desc },
        { new: true }
      );
      if (!todo) {
        return res
          .status(422)
          .send({ ok: true, message: "todo not found", todo });
      }
      return res.send({ ok: true, message: "todo updated!", todo });
    } catch (err) {
      return res.status(500).send({ ok: false, message: "error", err });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const resp = await Todo.findByIdAndRemove({ _id: id });
      if (!resp) {
        return res.status(422).send({ ok: false, message: "todo not found" });
      }
      return res.send({ ok: true, message: "todo deleted!" });
    } catch (err) {
      return res.status(500).send({ ok: true, message: "error", err });
    }
  },
};

module.exports = controller;
