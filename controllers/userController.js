const {
  createUser,
  logUser,
  updateUserWithImage,
} = require("../services/userService");
const { uploadImage } = require("../services/cloudinaryService");

const cloudinaryParentFolder = "vinted/users";

const signup = async (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ message: "Username must be filled" });
  }
  if (!req.body.email) {
    return res.status(400).json({ message: "Email must be filled" });
  }

  try {
    const newUser = await createUser(req.body);
    if (req.files.picture) {
      const profilePicture = await uploadImage(
        newUser._id,
        cloudinaryParentFolder,
        req.files.picture,
      );

      const accountUpdated = {
        username: newUser.account.username,
        avatar: profilePicture,
      };
      const userWithPhoto = await updateUserWithImage(
        newUser._id,
        accountUpdated,
      );
      return res.status(201).json(userWithPhoto);
    } else {
      return res.status(201).json(newUser);
    }
  } catch (error) {
    if (error.message.includes("email_1 dup key")) {
      return res
        .status(400)
        .json("There is already an account associated to this email");
    } else {
      return res.status(500).json(error.message);
    }
  }
};

const login = async (req, res) => {
  try {
    const result = await logUser(req.body);
    return res.json(result.message);
  } catch (error) {
    if (error.message.includes("Unauthorized")) {
      return res.status(401).json(error.message);
    } else {
      return res.status(500).json(error.message);
    }
  }
};

module.exports = { signup, login };
