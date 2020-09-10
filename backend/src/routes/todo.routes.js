const express = require("express");
const controller = require("../controllers/todo.controllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.get("/", [isAuthenticated], controller.get);
router.get("/:id", [isAuthenticated], controller.show);
router.post("/", [isAuthenticated], controller.store);
router.put("/:id", [isAuthenticated], controller.update);
router.delete("/:id", [isAuthenticated], controller.delete);

module.exports = router;
