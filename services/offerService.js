const Offer = require("../models/Offer");

const createOfferInDB = async (data) => {
  const offer = await Offer.create(data);
  const offerPopulated = await offer.populate("owner");

  return offerPopulated;
};

const updateOfferInDB = async (offerId, data) => {
  const offerUpdated = await Offer.findByIdAndUpdate(offerId, data, {
    returnDocument: "after",
  });
  await offerUpdated.populate("owner", "account email"); //affiche uniquement les cles account et email
  return offerUpdated;
};

const deleteOfferInDB = async (offerId) => {
  await Offer.findByIdAndDelete(offerId);
};

const findOffersInDB = async (data) => {
  const filterFind = {};
  const sortMethod = {};

  if (data.title) {
    filterFind.product_name = new RegExp(`${data.title}`, "i");
  }
  if (data.priceMin) {
    filterFind.product_price = { $gte: Number(data.priceMin) };
  }
  if (data.priceMax) {
    if (!filterFind.product_price) {
      filterFind.product_price = {};
    }
    filterFind.product_price.$lte = Number(data.priceMax);
  }
  if (data.sort) {
    switch (data.sort) {
      case "price-desc":
        sortMethod.product_price = -1;
        break;
      case "price-asc":
        sortMethod.product_price = 1;
        break;
    }
  }

  const limitResult = 2;
  const countDocuments = await Offer.countDocuments(filterFind);

  if (data.page >= 1) {
    const offers = await Offer.find(filterFind)
      .sort(sortMethod)
      .limit(limitResult)
      .skip((Number(data.page) - 1) * limitResult)
      .select("product_name product_price")
      .populate("owner", "account");

    return { count: countDocuments, offers: offers };
  } else {
    const offers = await Offer.find(filterFind)
      .sort(sortMethod)
      .limit(limitResult)
      .select("product_name product_price")
      .populate("owner", "account");

    return { count: countDocuments, offers: offers };
  }
};

const findOfferByIdInDB = async (id) => {
  const offer = await Offer.findById(id).populate("owner", "account");

  return offer;
};

module.exports = {
  createOfferInDB,
  updateOfferInDB,
  deleteOfferInDB,
  findOffersInDB,
  findOfferByIdInDB,
};
