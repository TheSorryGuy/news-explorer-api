const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const AuthError = require('../errors/authError');
const { authRequired } = require('../errors/errorMessages');


module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    next(new AuthError(authRequired));
  }

  req.user = payload;

  next();
};
