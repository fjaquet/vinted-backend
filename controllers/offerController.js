const {
  createOfferInDB,
  updateOfferInDB,
  deleteOfferInDB,
  findOffersInDB,
  findOfferByIdInDB,
} = require("../services/offerService");

const { uploadImage, deleteImage } = require("../services/cloudinaryService");

const Offer = require("../models/Offer");

const cloudinaryParentFolder = "vinted/offers";

const publishOffer = async (req, res, next) => {
  try {
    const data = {
      product_name: req.body.product_name,
      product_description: req.body.product_description,
      product_price: req.body.product_price,
      product_details: [
        {
          MARQUE: req.body.brand,
        },
        {
          TAILLE: req.body.size,
        },
        {
          ÉTAT: req.body.condition,
        },
        {
          COULEUR: req.body.color,
        },
        {
          EMPLACEMENT: req.body.city,
        },
      ],
      owner: req.user._id,
    };

    const offer = await createOfferInDB(data);

    const imageUploaded = await uploadImage(
      offer.id,
      cloudinaryParentFolder,
      req.files.picture,
    );

    const offerWithImage = await updateOfferInDB(offer.id, {
      product_image: imageUploaded,
    });

    return res.status(201).json({
      offerWithImage,
    });
  } catch (error) {
    next(error);
  }
};

const updateOffer = async (req, res, next) => {
  try {
    const offerUpdated = await updateOfferInDB(req.params.id, req.body);
    return res.status(200).json({
      _id: offerUpdated.id,
      product_name: offerUpdated.product_name,
      product_description: offerUpdated.product_description,
      product_price: offerUpdated.product_price,
      product_details: offerUpdated.product_details,
      owner: {
        account: {
          username: offerUpdated.owner.account.username,
        },
        _id: offerUpdated.owner._id,
      },
      product_image: offerUpdated.product_image,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOffer = async (req, res, next) => {
  try {
    const id = req.params.id;

    const offer = await Offer.findById(id);

    if (offer) {
      await deleteImage(id, cloudinaryParentFolder);
      await deleteOfferInDB(id);
      return res.json({ message: "Offer deleted" });
    } else {
      return res.status(400).json({ message: "Offer not found" });
    }
  } catch (error) {
    next(error);
  }
};

const getOffers = async (req, res, next) => {
  if (!req.queryValidated) {
    return res.json({
      count: 0,
      offers: [],
    });
  }

  try {
    const result = await findOffersInDB(req.query);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const getOfferById = async (req, res, next) => {
  try {
    const offer = await findOfferByIdInDB(req.params.id);
    if (offer) {
      return res.json(offer);
    } else {
      return res.json({ message: "Offer not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  publishOffer,
  updateOffer,
  deleteOffer,
  getOffers,
  getOfferById,
};
