const { fileTypeFromBuffer } = require("file-type");

const imageUploadValidator = async (req, res, next) => {
  if (req.files) {
    if (!Object.keys(req.files).includes("picture")) {
      return res
        .status(400)
        .json({ message: "Invalid key name for picture, must be 'picture'" });
    }

    const type = await fileTypeFromBuffer(req.files.picture.data);

    if (
      !type ||
      !["image/jpeg", "image/png", "image/webp"].includes(type.mime)
    ) {
      return res.status(415).json({
        message: "Invalid file type. Must be 'jpeg, png or webp'",
      });
    }

    if (req.files.picture.size > 2 * 1024 * 1024) {
      return res.status(400).json({
        message: "Max size allowed for picture is 2 MB",
      });
    }
  }

  next();
};

module.exports = imageUploadValidator;
