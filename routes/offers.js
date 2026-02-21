const express = require("express");

const router = express.Router();

const { getOffers, getOfferById } = require("../controllers/offerController");
const payloadValidator = require("../middlewares/payloadValidator");
const { objectIdSchema } = require("../validations/offerValidation");

router.get("/", getOffers);

router.get("/:id", payloadValidator(objectIdSchema, "params"), getOfferById);

module.exports = router;
