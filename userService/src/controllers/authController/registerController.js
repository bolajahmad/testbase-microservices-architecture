const User = require("../../models/user.model");
const { registerValidator } = require("../../utils/validation");
const encryptPassword = require("../../utils/encryptPassword");
const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const rabbit = require('../../rabbit');

const handleValidation = (body, key) => {
  const { error } = registerValidator(body);
  if (error) {
    throw Error(error.details[0].message);
  }
};

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

const registerController = async (req, res) => {
  try {
    const { username, password, firstName, lastName } = req.body;

    var docClient = new AWS.DynamoDB.DocumentClient();

    handleValidation({
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password
    }, "register");

    const params = {
      TableName: 'UsersTable',
      Key: {
        username
      }
    };

    docClient.get(params, async function(err, data) {
      if (err) {
        console.log({ err });
        throw err;
      } else {
        console.log({ data });
        const hasLength = Object.keys(data).length > 0 ?? false;
        if (hasLength) {
          return res.status(400).json({ 
            message: "Username/password already exists",
            isSuccessful: false,
            data: undefined
          });
        }

        const hashed = await encryptPassword(password);
        const token = v4();

        const params = {
          TableName: 'UsersTable',
          Item: {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: hashed,
            status: 'Pending',
            confirmationCode: token
          }
        };

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
      
        docClient.put(params);
        return res.status(201).json({
          message: 'User signup successful',
          isSuccessful: true,
          data: null
        });
      }
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
