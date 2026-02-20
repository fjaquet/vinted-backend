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

module.exports = {
  createOfferInDB,
  updateOfferInDB,
  deleteOfferInDB,
};
