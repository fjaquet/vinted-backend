const imageUploadValidator = (req, res, next) => {
  console.log(req.files);
  console.log(Object.keys(req.files));
  if (!Object.keys(req.files).includes("picture")) {
    return res
      .status(400)
      .json({ message: "Invalid key name for picture, must be 'picture'" });
  }

  if (
    !["image/jpeg", "image/png", "image/webp"].includes(
      req.files.picture.mimetype,
    )
  ) {
    return res.status(400).json({
      message: "Format not supported for picture. Must be 'jpeg, png or webp'",
    });
  }

  if (req.files.picture.size > 2 * 1024 * 1024) {
    return res.status(400).json({
      message: "Max size allowed for picture is 2 MB",
    });
  }

  next();
};

module.exports = imageUploadValidator;
