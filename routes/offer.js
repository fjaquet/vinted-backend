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
const imageUploadValidator = require("../middlewares/imageUploadValidator");

const {
  publishOfferSchema,
  updateOfferSchema,
  objectIdSchema,
} = require("../validations/offerValidation");

router.post(
  "/publish",
  isAuthenticated,
  fileUpload(),
  imageUploadValidator,
  payloadValidator(publishOfferSchema, "body"),
  publishOffer,
);
router.put(
  "/:id",
  isAuthenticated,
  fileUpload(),
  imageUploadValidator,
  payloadValidator(objectIdSchema, "params"),
  payloadValidator(updateOfferSchema, "query"),
  updateOffer,
);
router.delete(
  "/:id",
  isAuthenticated,
  payloadValidator(objectIdSchema, "params"),
  deleteOffer,
);

module.exports = router;
