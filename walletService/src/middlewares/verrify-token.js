const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();

 const ValidateToken = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const secretKey = process.env.TOKEN_SECRET_KEY;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return response.status(401).json({
      message: 'Unauthorized Access',
      isSuccessful: false,
      data: undefined
  });

  jwt.verify(token, secretKey, (err, user) => {
    if (err || !user) return response.status(403).json({
        message: 'Invalid Token',
        isSuccessful: false
    });

    request.body.user = {
        id: user.userId,
        username: user.email
    };
    next();
  });
}

module.exports = ValidateToken;