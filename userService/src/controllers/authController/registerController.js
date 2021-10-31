const User = require("../../models/user.model");
const { registerValidator } = require("../../utils/validation");
const encryptPassword = require("../../utils/encryptPassword");
const { v4 } = require('uuid');
const axios = require('axios');
const rabbit = require('../../rabbit');

const handleValidation = (body, key) => {
  const { error } = registerValidator(body);
  if (error) {
    throw Error(error.details[0].message);
  }
};

const registerController = async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    handleValidation({
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password
    }, "register");

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({ 
        message: "Username/password already exists",
        isSuccessful: false,
        data: undefined
      });
    }
    
    const hashed = await encryptPassword(password);
    const token = v4();

    const user = new User({
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: hashed,
      status: 'Pending',
      confirmationCode: token
    });

    const emailApi = process.env.EMAIL_API + 'email';

const emailData = {
        email: username,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${username.split('@')[0].trim()}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:3000/confirm/${token}> Click here</a>
            </div>`,
      };
      const broker = await rabbit.getInstance();
      await broker.send('email-queue', Buffer.from(JSON.stringify(emailData)));
      
    // axios({
    //   method: 'POST',
    //   url: emailApi,
    //   data: {
    //     email: username,
    //     subject: "Please confirm your account",
    //     html: `<h1>Email Confirmation</h1>
    //         <h2>Hello ${username.split('@')[0].trim()}</h2>
    //         <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
    //         <a href=http://localhost:3000/confirm/${token}> Click here</a>
    //         </div>`,
    //   }
    // }).then((data) => console.log({ data }))
    // .catch((error) => console.log({ error }));
    await user.save();

    return res.status(201).json({
      message: 'User signup successful',
      isSuccessful: true,
      data: null
    });
  } catch (error) {
    return res.status(400).json({ 
      message: error.message,
      isSuccessful: false,
      data: undefined
    });
  }
};

module.exports = registerController;
