const cloudinary = require("cloudinary").v2;

const convertToBase64 = require("../utils/convertToBase64");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CONFIG_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
  api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
});

const uploadImage = async (id, parent_folder, picture) => {
  const imageBase64 = convertToBase64(picture);
  const uploadImage = await cloudinary.uploader.upload(imageBase64, {
    folder: `${parent_folder}/${id}`,
    overwrite: true,
  });

  return uploadImage;
};

const deleteImage = async (offerId, parent_folder) => {
  const folderPath = `${parent_folder}/${offerId}`;
  const prefix = `${folderPath}/`;

  try {
    await cloudinary.api.delete_resources_by_prefix(prefix);
    await cloudinary.api.delete_folder(folderPath);
  } catch (error) {
    throw error;
  }
};

module.exports = { uploadImage, deleteImage };
