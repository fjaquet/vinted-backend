const express = require("express");
const Offer = require("../models/Offer");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filterFind = {};
    const filterSort = {};

    if (req.query.title) {
      filterFind.product_name = new RegExp(`${req.query.title}`, "i");
    }
    if (req.query.priceMin) {
      filterFind.product_price = { $gte: Number(req.query.priceMin) };
    }
    if (req.query.priceMax) {
      if (!filterFind.product_price) {
        filterFind.product_price = {};
      }
      filterFind.product_price.$lte = Number(req.query.priceMax);
    }
    if (req.query.sort) {
      switch (req.query.sort) {
        case "price-desc":
          filterSort.product_price = -1;
          break;
        case "price-asc":
          filterSort.product_price = 1;
          break;
      }
    }

    const limitResult = 2;
    const countDocuments = await Offer.countDocuments(filterFind);

    if (req.query.page >= 1) {
      const offers = await Offer.find(filterFind)
        .sort(filterSort)
        .limit(timitResult)
        .skip((Number(req.query.page) - 1) * limitResult)
        .select("product_name product_price")
        .populate("owner", "account");
      return res.json({ count: countDocuments, offers: offers });
    } else {
      const offers = await Offer.find(filterFind)
        .sort(filterSort)
        .limit(limitResult)
        .select("product_name product_price")
        .populate("owner", "account");
      return res.json({ count: countDocuments, offers: offers });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const offer = await Offer.findById(req.params.id).populate(
        "owner",
        "account",
      );
      if (offer) {
        return res.json(offer);
      } else {
        return res.status(400).json({ message: "Offer not found" });
      }
    } else {
      return res.status(400).json({ message: "Offer if missing" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
module.exports = router;
