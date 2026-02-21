const express = require("express");
const fileUpload = require("express-fileupload");

const router = express.Router();
const { signup, login } = require("../controllers/userController");
const payloadValidator = require("../middlewares/payloadValidator");
const { signupSchema, loginSchema } = require("../validations/userValidation");

router.post(
  "/signup",
  fileUpload(),
  payloadValidator(signupSchema, "body"),
  signup,
);
router.post("/login", payloadValidator(loginSchema, "body"), login);

module.exports = router;
