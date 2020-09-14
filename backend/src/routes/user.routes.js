const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.put("/:id", [isAuthenticated], controller.update);

module.exports = router;
