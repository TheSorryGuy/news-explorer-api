const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { SECRET } = require('../config');
const DuplicateError = require('../errors/duplicateError');
const { duplicateEmail } = require('../errors/errorMessages');
const { authSuccess } = require('../responseMessages');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name, email, password: hash,
    }))
    .then((createdUser) => res.send({
      name: createdUser.name, email: createdUser.email, _id: createdUser._id,
    }))
    .catch((err) => {
      let error = err;

      if (err.code === 11000) {
        error = new DuplicateError(duplicateEmail);
      }

      next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  user.identifyUser(email, password)
    .then((identifiedUser) => {
      const token = jwt.sign({ _id: identifiedUser._id }, SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ message: authSuccess });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  user.findById(req.user._id)
    .then((me) => res.send(me))
    .catch(next);
};
