const User = require("../models/user.model");
const getUser = require("../services/user.services");

const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find((err, users) => {
      if (err) res.status(500).json({ success: false, error: err });
      const data = users
        .filter(({ status }) => status !== 'Pending')
        .filter(({ _id }) => _id !== userId)
        .map(({ last_name, first_name, username, _id }) => ({
          lastName: last_name,
          firstName: first_name,
          id: _id,
          username
        }));

      res.status(200).json({ 
        message: 'Users Retrieved Successfully', 
        isSuccessful: true, 
        data
       });
    });
    return users;
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCurrentUserController = async (req, res) => {
  try {
    const user = await getUser({ _id: req.user._id }, false);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error_msg: error.message });
  }
};

module.exports = { getCurrentUserController, getAllUsersController };
