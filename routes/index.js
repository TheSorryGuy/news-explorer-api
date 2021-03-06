const mainRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const users = require('./users');
const articles = require('./articles');
const NotFoundError = require('../errors/notFoundError');
const { notFound } = require('../errors/errorMessages');

mainRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
}), createUser);
mainRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
}), login);

mainRouter.use(auth);
mainRouter.use('/', users);
mainRouter.use('/', articles);
mainRouter.use('/', () => {
  throw new NotFoundError(notFound);
});

module.exports = mainRouter;
