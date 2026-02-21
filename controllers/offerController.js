const {
  createOfferInDB,
  updateOfferInDB,
  deleteOfferInDB,
  findOffersInDB,
  findOfferByIdInDB,
} = require("../services/offerService");

const { uploadImage, deleteImage } = require("../services/cloudinaryService");

const mongoose = require("mongoose");

const Offer = require("../models/Offer");

const cloudinaryParentFolder = "vinted/offers";

const publishOffer = async (req, res) => {
  if (
    !req.body.product_name ||
    !req.body.product_description ||
    !req.body.product_price
  ) {
    return res.status(400).json({ message: "missing parameters" });
  }

  if (req.body.product_description.length > 500) {
    return res.status(400).json({ message: "description too long" });
  }

  if (req.body.product_name.length > 50) {
    return res.status(400).json({ message: "tittle too long" });
  }

  if (Number(req.body.product_price) > 100000) {
    return res.status(400).json({ message: "price too high" });
  }

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
    return res.status(500).json(error.message);
  }
};

const updateOffer = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid Id format" });
    }

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
    return res.status(500).json(error.message);
  }
};

const deleteOffer = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid Id format" });
    }
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
    return res.status(500).json(error.message);
  }
};

const getOffers = async (req, res) => {
  try {
    const result = await findOffersInDB(req.query);
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getOfferById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid Id format" });
    }

    const offer = await findOfferByIdInDB(req.params.id);
    if (offer) {
      return res.json(offer);
    } else {
      return res.status(400).json({ message: "Offer not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  publishOffer,
  updateOffer,
  deleteOffer,
  getOffers,
  getOfferById,
};
