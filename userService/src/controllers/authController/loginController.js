const User = require("../../models/user.model");
const { loginValidator } = require("../../utils/validation");
const getUser = require("../../services/user.services");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const handleValidation = (body) => {
  const { error } = loginValidator(body);
  if (error) {
    throw Error(error.details[0].message);
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    handleValidation({ username, password });

    const user = await getUser({ username }, true);

    const validPassword = await bcrypt.compare(password, user.password);
    console.log({ user, validPassword })
    if (!validPassword) {
      return res.status(400).json({ 
        message: "incorrect password/username",
        isSuccessful: false,
        data: undefined
      });
    }

    if (user.status !== 'Active') {
      return res.status(401).json({
        message: 'Email is not verified. Check email and retry',
        isSuccessful: false
      });
    }
    
    const token = jwt.sign(
      { userId: user._id, email: user.username },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    
    return res.status(200).json({
      message: 'Login Successful',
      isSuccessful: true,
      data: {
        id: user._id,
        username: user.username,
        token,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });
  } catch (error) {
    return res.status(401).json({ message: error.message, isSuccessful: falsle });
  }
};

module.exports = loginController;
