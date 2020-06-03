const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const AuthError = require('../errors/authError');


module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
