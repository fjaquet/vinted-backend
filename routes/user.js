const express = require("express");
const fileUpload = require("express-fileupload");

const router = express.Router();
const { signup, login } = require("../controllers/userController");

router.post("/signup", fileUpload(), signup);
router.post("/login", login);

module.exports = router;
