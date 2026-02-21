const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();

const {
  publishOffer,
  updateOffer,
  deleteOffer,
} = require("../controllers/offerController");

const isAuthenticated = require("../middlewares/isAuthenticated");
const payloadValidator = require("../middlewares/payloadValidator");
const {
  publishOfferSchema,
  objectIdSchema,
} = require("../validations/offerValidation");

router.post(
  "/publish",
  isAuthenticated,
  fileUpload(),
  payloadValidator(publishOfferSchema, "body"),
  publishOffer,
);
router.put(
  "/:id",
  isAuthenticated,
  fileUpload(),
  payloadValidator(objectIdSchema, "params"),
  updateOffer,
);
router.delete(
  "/:id",
  isAuthenticated,
  payloadValidator(objectIdSchema, "params"),
  deleteOffer,
);

module.exports = router;
