const express = require("express");
const authController = require("../auth/authController");
const { body } = require("express-validator");
const router = express.Router();
module.exports = router.post(
	"/login",
	body("username"),
	body("password"),
	authController.login
);
