const jwt = require('jsonwebtoken');

//Secret from .env
const { secret } = require('../config/secret');
//Generates a token for the user
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['owner'],
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;
