const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (typeof req.headers.authorization !== "string") {
    return res.status(401).json("Invalid token format");
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  const user = await User.findOne({ token: token });

  if (user) {
    req.user = user;
  } else {
    return res.status(401).json("Unauthorized");
  }

  next();
};

module.exports = isAuthenticated;
