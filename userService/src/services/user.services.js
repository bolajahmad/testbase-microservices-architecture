const User = require("../models/user.model");

const getUser = async (query, password) => {
  try {
    let user;
    if (password) {
      user = await User.findOne(query).select("+password");
    } else {
      user = await User.findOne(query);
    }
    if (!user) {
      throw Error("User not found");
    }
    console.log({ user })
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = getUser;
