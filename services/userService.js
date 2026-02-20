const mongoose = require("mongoose");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

const createUser = async (data) => {
  if (!data.username) {
    throw { message: "Username must be filled" };
  }
  if (!data.email) {
    throw { message: "Email must be filled" };
  }
  const password = data.password;
  const salt = uid2(16);
  const hash = SHA256(password + salt).toString(encBase64);
  const token = uid2(64);

  const user = await User.create({
    email: data.email,
    account: {
      username: data.username,
      avatar: data.avatar,
    },
    newsletter: data.newsletter,
    token: token,
    hash: hash,
    salt: salt,
  });

  return {
    _id: user._id,
    token: user.token,
    account: {
      username: user.account.username,
    },
  };
};

const updateUserWithImage = async (userId, accountUpdate) => {
  const photoUpdated = await User.findByIdAndUpdate(
    userId,
    {
      account: accountUpdate,
    },
    {
      returnDocument: "after",
    },
  );

  return photoUpdated;
};

const logUser = async (data) => {
  const email = data.email;
  const password = data.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw { message: "Unauthorized" };
  }

  const hash = SHA256(password + user.salt).toString(encBase64);

  if (hash !== user.hash) {
    throw { message: "Unauthorized" };
  } else {
    return {
      message: {
        _id: user._id,
        token: user.token,
        account: {
          username: user.account.username,
        },
      },
    };
  }
};

module.exports = { createUser, logUser, updateUserWithImage };
