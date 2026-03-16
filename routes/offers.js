const express = require("express");

const router = express.Router();

const { getOffers } = require("../controllers/offerController");
const payloadValidator = require("../middlewares/payloadValidator");
const { getOffersSchema } = require("../validations/offerValidation");

router.get(
  "/",
  payloadValidator(getOffersSchema, "query", "safeParse"),
  getOffers,
);

module.exports = router;
