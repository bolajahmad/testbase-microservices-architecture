const User = require("../../models/user.model");
const { registerValidator } = require("../../utils/validation");
const encryptPassword = require("../../utils/encryptPassword");

const handleValidation = (body) => {
  const { error } = registerValidator(body);
  if (error) {
    throw Error(error.details[0].message);
  }
};

const registerController = async (req, res) => {
  try {
    await handleValidation(req.body, "register");
    const { username, password } = req.body;
    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
      return res.status(400).json({ error_msg: "Username already exists" });
    }
    req.body.password = await encryptPassword(password);

    const user = new User(req.body);
    const savedUser = await user.save();
    const token = savedUser.getSignedToken();
    return res.status(201).json({ user_access_token: token });
  } catch (error) {
    return res.status(400).json({ error_msg: error.message });
  }
};

module.exports = registerController;
